// npm libs
import React from 'react';
import Redirect from 'react-router-dom/Redirect';

// components
import PageContainer from 'components/layout/PageContainer';

// routing
import { routes } from 'routing';

const authHelper = ({ component: Component, isGuestRequired, isGuest, status }) => {
  const AuthHOC = () => {
    if (status === 'LOADING') {
      return (
        <PageContainer expand-y>
          <img src={`${APP_SETTINGS.assets_path}/images/loader.svg`} alt="loader" />
        </PageContainer>
      );
    }

    if (isGuestRequired && isGuest === false) {
      return <Redirect to={{ pathname: routes.HOME }} />;
    }

    return <Component />;
  };

  return AuthHOC;
};

export default authHelper;
