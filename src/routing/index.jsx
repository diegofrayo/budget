// npm libs
import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import createHistory from 'history/createBrowserHistory';

// pages
import Home from 'pages/Home';
import Login from 'pages/Login';
import Summary from 'pages/Summary';

const history = createHistory();
const ROOT = APP_SETTINGS.environment === 'development' ? '' : `/${APP_SETTINGS.app_name}`;
const routes = {
  HOME: ROOT === '' ? '/' : ROOT,
  LOGIN: `${ROOT}/login`,
  SUMMARY: `${ROOT}/summary`,
};

const Router = () => (
  <Switch>
    <Route exact path={routes.HOME} component={Home} />
    <Route exact path={routes.LOGIN} component={Login} />
    <Route exact path={routes.SUMMARY} component={Summary} />
  </Switch>
);

const goTo = route => {
  history.push(route);
};

export { Router, routes, goTo, history };
