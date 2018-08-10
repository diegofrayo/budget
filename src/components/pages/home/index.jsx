// npm libs
import React from 'react';
import classnames from 'classnames';

// fomr config
import formConfig from './formConfig';

// styles
import { Container, Form, Label, Button, ErrorMessage, Title } from './styles';

class Home extends React.Component {
  state = {
    form: {},
    errors: {
      valid: false,
      messages: {},
    },
  };

  onSubmit = event => {
    event.preventDefault();
    console.log(this.state);
  };

  onChangeInput = event => {
    const { name, value } = event.currentTarget;

    this.setState(prevState => {
      const formValues = {
        ...prevState.form,
        [name]: value,
      };
      return {
        ...prevState,
        form: formValues,
        errors: this.validateForm(formValues),
      };
    });
  };

  validateForm = formValues => {
    return Object.entries(formConfig).reduce(
      (acum, [key, inputConfig]) => {
        if (inputConfig.required && inputConfig.validate(formValues[key]) === false) {
          acum.messages[key] = inputConfig.errorMessage;
          acum.valid = false;
        } else {
          acum.messages[key] = '';
        }

        return acum;
      },
      { valid: true, messages: {} }
    );
  };

  render() {
    return (
      <Container>
        <Title>Create a transaction</Title>
        <Form onSubmit={this.onSubmit}>
          {Object.entries(formConfig).map(([key, value]) => {
            const Element = value.component || value.element;
            const errorMessage = this.state.errors[key] || false;

            return (
              <Label key={key} htmlFor={key} error={errorMessage}>
                {value.label && <span>{value.label}</span>}
                <Element
                  id={key}
                  name={key}
                  value={this.state.form[key]}
                  className={classnames('input', Element)}
                  onChange={this.onChangeInput}
                  {...value.inputProps}
                />
                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
              </Label>
            );
          })}
          <Button type="submit" disabled={this.state.errors.valid === false}>
            Create
          </Button>
        </Form>
      </Container>
    );
  }
}

export default Home;
