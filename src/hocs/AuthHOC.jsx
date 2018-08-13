// npm libs
import React from 'react';
import Redirect from 'react-router-dom/Redirect';

// routing
import { routes } from 'routing';

const authHelper = ({ component: Component, isGuestRequired, isGuest }) => {
  const AuthHOC = () => {
    if (isGuestRequired && isGuest === false) {
      return <Redirect to={{ pathname: routes.HOME }} />;
    }

    return <Component />;
  };

  return AuthHOC;
};

export default authHelper;
