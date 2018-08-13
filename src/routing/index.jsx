// npm libs
import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import createHistory from 'history/createBrowserHistory';

// services
import { onAuthStateChanged, updateUserSession } from 'services/auth';

// components
import ReactComponent from 'lib/Component';
import PageContainer from 'components/layout/PageContainer';

// pages
import Home from 'pages/Home';
import SignIn from 'pages/SignIn';
import Summary from 'pages/Summary';

// hocs
import AuthHOC from 'hocs/AuthHOC';

const history = createHistory();
const ROOT = APP_SETTINGS.environment === 'development' ? '' : `/${APP_SETTINGS.app_name}`;
const routes = {
  HOME: ROOT === '' ? '/' : ROOT,
  SIGN_IN: `${ROOT}/sign-in`,
  SUMMARY: `${ROOT}/summary`,
};

const goTo = route => {
  history.push(route);
};

const Router = () => (
  <ReactComponent
    state={{
      authState: 'LOADING',
      isGuest: true,
    }}
    componentDidMount={setState => {
      onAuthStateChanged(user => {
        console.log('onAuthStateChanged', user);
        if (user) {
          setState({ isGuest: false, authState: 'LOGGED_IN' });
          updateUserSession({ isGuest: false, username: 'diegofrayo' });
        } else {
          setState({ isGuest: true, authState: 'NOT_LOGGED_IN' });
          updateUserSession({ isGuest: true, username: 'guest' });
        }
      });
    }}
  >
    {state => {
      console.log('render AuthHOC', state);

      if (state.authState === 'LOADING') {
        return (
          <PageContainer fullHeight>
            <img src={`${APP_SETTINGS.assets_path}/images/loader.svg`} alt="loader" />
          </PageContainer>
        );
      }

      return (
        <Switch>
          <Route exact path={routes.HOME} component={AuthHOC({ component: Home })} />
          <Route exact path={routes.SUMMARY} component={AuthHOC({ component: Summary })} />
          <Route
            exact
            path={routes.SIGN_IN}
            component={AuthHOC({
              component: SignIn,
              isGuest: state.isGuest,
              isGuestRequired: true,
            })}
          />
        </Switch>
      );
    }}
  </ReactComponent>
);

export { Router, routes, goTo, history };
