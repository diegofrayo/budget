// npm libs
import React from 'react';

// services
import { createTransaction } from 'services/mocks';
import { createCustomError } from 'services/utilities';

// components
import Form from 'components/common/Form';
import PageContainer from 'components/layout/PageContainer';

// form config
import formConfig from './formConfig';

class Home extends React.Component {
  onSubmit = formValues => {
    return createTransaction(formValues)
      .then(() => {
        return {
          type: 'success',
          message: 'Transaction created',
          showResponseMessage: true,
        };
      })
      .catch(() => {
        return Promise.reject(
          createCustomError({
            type: 'error',
            message: 'Transaction has not been created, please try again later',
            showResponseMessage: true,
          })
        );
      });
  };

  render() {
    return (
      <PageContainer>
        <Form
          title="Create a transaction"
          formConfig={formConfig}
          buttonText="Create"
          onSubmit={this.onSubmit}
        />
      </PageContainer>
    );
  }
}

export default Home;
