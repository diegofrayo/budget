// npm libs
import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';

// pages
import About from 'pages/About';
import Home from 'pages/Home';

const ROOT = APP_SETTINGS.environment === 'development' ? '' : '/budget';
const routes = {
  HOME: ROOT === '' ? '/' : ROOT,
  ABOUT: `${ROOT}/about`,
};

const Router = () => (
  <Switch>
    <Route exact path={routes.HOME} component={Home} />
    <Route exact path={routes.ABOUT} component={About} />
  </Switch>
);

export { Router, routes };
