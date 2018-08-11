// npm libs
import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import createHistory from 'history/createBrowserHistory';

// pages
import Summary from 'pages/Summary';
import Home from 'pages/Home';

const history = createHistory();
const ROOT = APP_SETTINGS.environment === 'development' ? '' : `/${APP_SETTINGS.app_name}`;
const routes = {
  HOME: ROOT === '' ? '/' : ROOT,
  SUMMARY: `${ROOT}/summary`,
};

const Router = () => (
  <Switch>
    <Route exact path={routes.HOME} component={Home} />
    <Route exact path={routes.SUMMARY} component={Summary} />
  </Switch>
);

const goTo = route => {
  history.push(route);
};

export { Router, routes, goTo, history };
