// npm libs
import React from 'react';

// services
import { createCustomError, transformFormValues } from 'services/utilities';

// components
import Form from 'components/common/Form';
import PageContainer from 'components/layout/PageContainer';

// form config
import formConfig from './formConfig';

class Home extends React.Component {
  componentDidMount() {
    if (APP_SETTINGS.environment !== 'development') {
      import('./../../../services/firebase').then(moduleLoaded => {
        this.createTransaction = moduleLoaded.createTransaction;
      });
    } else {
      import('./../../../services/mocks').then(moduleLoaded => {
        this.createTransaction = moduleLoaded.createTransaction;
      });
    }
  }

  onSubmit = formValues => {
    return this.createTransaction(transformFormValues(formValues, formConfig))
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
    // throw new Error('Error Catcher tests');
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
