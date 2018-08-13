// npm libs
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

// components
import Button from 'components/common/Button';
import ResponseMessage from 'components/common/ResponseMessage';

// styles
import { FormContainer, Title, Form as FormElement, Label } from './styles';

class Form extends React.Component {
  static initialState = {
    status: 'NORMAL', // 'NORMAL', 'LOADING'
    formErrors: {
      valid: false,
      messages: {},
    },
    responseMessage: {
      type: '',
      message: '',
      show: false,
    },
    formValues: {},
  };

  state = { ...Form.initialState };

  componentDidMount() {
    this.setDefaultFormValues();
  }

  componentWillUnmount() {
    this.isComponentUnmounted = true;
  }

  onSubmit = event => {
    event.preventDefault();
    this.setState({ status: 'LOADING' });
    this.props
      .onSubmit(this.state.formValues)
      .then(response => {
        this.showResponseMessage(response);
        this.setState({ status: 'NORMAL' });
        document.getElementById('body-page-container').scrollTop = 3000;
      })
      .catch(err => {
        if (err && err.data) this.showResponseMessage(err.data);
        this.setState({ status: 'NORMAL' });
        document.getElementById('body-page-container').scrollTop = 3000;
      });
  };

  onChangeInput = event => {
    const { name, value } = event.currentTarget;

    this.setState(prevState => {
      const formValues = {
        ...prevState.formValues,
        [name]: value,
      };
      return {
        ...prevState,
        formValues,
        formErrors: this.validateForm(name, formValues, prevState.formErrors),
        responseMessage: Form.initialState.responseMessage,
      };
    });
  };

  setDefaultFormValues = () => {
    const formValues = Object.entries(this.props.formConfig).reduce(
      (acum, [inputName, inputConfig]) => {
        if (inputConfig.defaultValue) {
          acum[inputName] = inputConfig.defaultValue; // eslint-disable-line
        }
        return acum;
      },
      {}
    );

    this.setState(prevState => ({
      formValues,
      formErrors: this.validateForm('', formValues, prevState.formErrors),
    }));
  };

  closeResponseMessageHandler = () => {
    this.setState({ responseMessage: Form.initialState.responseMessage });
  };

  showResponseMessage = responseMessage => {
    if (!responseMessage || !responseMessage.showResponseMessage) return;

    this.setState({
      responseMessage: {
        ...responseMessage,
        show: true,
      },
    });

    setTimeout(() => {
      if (this.isComponentUnmounted !== true) this.closeResponseMessageHandler();
    }, 5000);
  };

  validateForm = (inputNameParam, formValues, formErrors) => {
    return Object.entries(this.props.formConfig).reduce(
      (acum, [inputName, inputConfig]) => {
        if (inputConfig.required && inputConfig.validate(formValues[inputName]) === false) {
          acum.valid = false; // eslint-disable-line
          if (inputName === inputNameParam) {
            acum.messages[inputName] = inputConfig.errorMessage; // eslint-disable-line
          }
        } else {
          acum.messages[inputName] = ''; // eslint-disable-line
        }

        return acum;
      },
      { valid: true, messages: { ...formErrors.messages } }
    );
  };

  render() {
    const { formConfig, title, buttonText } = this.props;
    return (
      <FormContainer>
        <Title>{title}</Title>
        <FormElement onSubmit={this.onSubmit}>
          <section className="inputs-container">
            <fieldset className="fieldset">
              {Object.entries(formConfig).map(([inputName, inputConfig]) => {
                const Element = inputConfig.component || inputConfig.element;
                const errorMessage = this.state.formErrors.messages[inputName] || false;

                return (
                  <Label
                    key={inputName}
                    htmlFor={inputName}
                    error={errorMessage}
                    required={
                      inputConfig.required &&
                      (!inputConfig.uiProps || !inputConfig.uiProps.disableRequiredAsterisk)
                    }
                  >
                    {inputConfig.label && <span className="label-text">{inputConfig.label}</span>}
                    <Element
                      id={inputName}
                      name={inputName}
                      value={this.state.formValues[inputName] || inputConfig.defaultValue || ''}
                      className={classnames(
                        'input-element',
                        inputConfig.inputProps.type,
                        inputConfig.element
                      )}
                      onChange={this.onChangeInput}
                      {...inputConfig.inputProps}
                    />
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                  </Label>
                );
              })}
            </fieldset>
            <ResponseMessage
              {...this.state.responseMessage}
              closeResponseMessageHandler={this.closeResponseMessageHandler}
            />
          </section>
          <Button
            disabled={this.state.formErrors.valid === false}
            loading={this.state.status === 'LOADING'}
            type="submit"
          >
            {buttonText}
          </Button>
        </FormElement>
      </FormContainer>
    );
  }
}

Form.propTypes = {
  title: PropTypes.string.isRequired,
  formConfig: PropTypes.object.isRequired,
  buttonText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
