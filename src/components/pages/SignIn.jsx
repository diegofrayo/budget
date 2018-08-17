// npm libs
import React from 'react';

// services
import { signIn } from 'services/auth';
import { createCustomError } from 'services/utilities';

// libs
import validator from 'lib/validator';

// components
import Form from 'components/common/Form';
import PageContainer from 'components/layout/PageContainer';

// form config
const formConfig = {
  email: {
    // defaultValue: 'diegofrayo@gmail.com',
    element: 'input',
    errorMessage: 'Please type a valid email',
    label: 'Email',
    required: true,
    inputProps: { type: 'email' },
    uiProps: {
      disableRequiredAsterisk: true,
    },
    validate: value => {
      return validator(value)
        .string()
        .email()
        .exec();
    },
  },
  password: {
    // defaultValue: '',
    element: 'input',
    errorMessage: 'Please type a valid password',
    label: 'Password',
    required: true,
    inputProps: { type: 'password' },
    uiProps: {
      disableRequiredAsterisk: true,
    },
    validate: value => {
      return validator(value)
        .string()
        .minLength(5)
        .exec();
    },
  },
};

class SignIn extends React.Component {
  onSubmit = formValues => {
    return signIn(formValues)
      .then(() => {
        return {
          type: 'success',
          message: 'Sign in successfully',
          showResponseMessage: true,
        };
      })
      .catch(() => {
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

export default SignIn;
