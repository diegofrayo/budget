// npm libs
import React from 'react';

// services
import { logIn } from 'services/auth';
import { createCustomError } from 'services/utilities';

// components
import Form from 'components/common/Form';
import PageContainer from 'components/layout/PageContainer';

// form config
const formConfig = {
  email: {
    element: 'input',
    errorMessage: 'Please type a valid email',
    inputProps: {},
    label: 'Email',
    required: true,
    type: 'email',
    uiProps: {
      disableRequiredPoint: true,
    },
    validate: value => {
      return value || false;
    },
  },
  password: {
    element: 'input',
    errorMessage: 'Please type a valid password',
    inputProps: {},
    label: 'Password',
    required: true,
    type: 'password',
    uiProps: {
      disableRequiredPoint: true,
    },
    validate: value => {
      return value || false;
    },
  },
};

class Login extends React.Component {
  onSubmit = formValues => {
    return logIn(formValues)
      .then(response => {
        console.log('SUCCESS', response);
        return {
          type: 'success',
          message: 'Log in successfully...',
          showResponseMessage: true,
        };
      })
      .catch(error => {
        console.log('ERROR', error);
        return Promise.reject(
          createCustomError({
            type: 'error',
            message: 'Email/Password are wrong',
            showResponseMessage: true,
          })
        );
      });
  };

  render() {
    return (
      <PageContainer>
        <Form
          title="Sign In"
          formConfig={formConfig}
          buttonText="Sign In"
          onSubmit={this.onSubmit}
        />
      </PageContainer>
    );
  }
}

export default Login;
