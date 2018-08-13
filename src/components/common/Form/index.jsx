// npm libs
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

// styles
import {
  FormContainer,
  Title,
  Form as FormElement,
  Label,
  ResponseMessage,
  Button,
} from './styles';

class Form extends React.Component {
  static initialState = {
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

  state = Form.initialState;

  componentDidMount() {
    this.setDefaultFormValues();
  }

  onSubmit = event => {
    event.preventDefault();
    this.props
      .onSubmit(this.state.formValues)
      .then(response => {
        this.showResponseMessage(response);
      })
      .catch(err => {
        if (err && err.data) this.showResponseMessage(err.data);
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
      };
    });
  };

  setDefaultFormValues = () => {
    this.setState({
      formValues: Object.entries(this.props.formConfig).reduce((acum, [inputName, inputConfig]) => {
        if (inputConfig.defaultValue) {
          acum[inputName] = inputConfig.defaultValue; // eslint-disable-line
        }
        return acum;
      }, {}),
    });
  };

  showResponseMessage = responseMessage => {
    if (!responseMessage || !responseMessage.showResponseMessage) return;

    this.setState({
      responseMessage: {
        ...responseMessage,
        show: true,
      },
    });
    setTimeout(() => this.setState({ responseMessage: Form.initialState }), 5000);
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
                      (!inputConfig.uiProps || !inputConfig.uiProps.disableRequiredPoint)
                    }
                  >
                    {inputConfig.label && <span className="label-text">{inputConfig.label}</span>}
                    <Element
                      id={inputName}
                      name={inputName}
                      value={this.state.formValues[inputName] || inputConfig.defaultValue || ''}
                      className={classnames('input', inputConfig.inputProps.type)}
                      onChange={this.onChangeInput}
                      {...inputConfig.inputProps}
                    />
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                  </Label>
                );
              })}
            </fieldset>
            <ResponseMessage
              show={this.state.responseMessage.show}
              type={this.state.responseMessage.type}
            >
              {this.state.responseMessage.message}
            </ResponseMessage>
          </section>
          <Button type="submit" disabled={this.state.formErrors.valid === false}>
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
