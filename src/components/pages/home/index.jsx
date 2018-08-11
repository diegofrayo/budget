// npm libs
import React from 'react';
import classnames from 'classnames';

// services
import { createTransaction } from 'services/firebase';

// components
import PageContainer from 'components/layout/PageContainer';

// form config
import formConfig from './formConfig';

// styles
import { FormContainer, Title, Form, Label, ResponseMessage, Button } from './styles';

class Home extends React.Component {
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
  };

  state = {
    formValues: Object.entries(formConfig).reduce((acum, [inputName, inputConfig]) => {
      if (inputConfig.defaultValue) {
        acum[inputName] = inputConfig.defaultValue; // eslint-disable-line
      }
      return acum;
    }, {}),
    ...Home.initialState,
  };

  onSubmit = event => {
    event.preventDefault();
    createTransaction(this.state.formValues)
      .then(() => {
        this.showResponseMessage({
          type: 'success',
          message: 'Transaction created',
        });
      })
      .catch(() => {
        this.showResponseMessage({
          type: 'error',
          message: 'Transaction has not been created, please try again later',
        });
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

  showResponseMessage = responseMessage => {
    this.setState({
      responseMessage: {
        ...responseMessage,
        show: true,
      },
    });
    setTimeout(() => this.setState({ responseMessage: Home.initialState }), 5000);
  };

  validateForm = (inputNameParam, formValues, formErrors) => {
    return Object.entries(formConfig).reduce(
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
    return (
      <PageContainer>
        <FormContainer>
          <Title>Create a transaction</Title>
          <Form onSubmit={this.onSubmit}>
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
                      required={inputConfig.required}
                    >
                      {inputConfig.label && <span className="label-text">{inputConfig.label}</span>}
                      <Element
                        id={inputName}
                        name={inputName}
                        value={this.state.formValues[inputName] || inputConfig.defaultValue || ''}
                        type={inputConfig.type}
                        className={classnames('input', Element)}
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
              Create
            </Button>
          </Form>
        </FormContainer>
      </PageContainer>
    );
  }
}

export default Home;
