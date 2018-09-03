// npm libs
import React from 'react';
import PropTypes from 'prop-types';
import ReactRouter from 'react-router-dom/Router';
import { AppContainer } from 'react-hot-loader';
import { ThemeProvider } from 'emotion-theming';

// components
import Header from 'components/layout/Header';
import ErrorCatcherHOC from 'hocs/ErrorCatcherHOC';

// Routing
import { Router, history } from 'routing';

// theme
import { createPlainStylesObject, theme as appTheme } from 'styles';

const styles = createPlainStylesObject(() => ({
  container: {
    backgroundColor: 'white',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    margin: ' 0 auto',
  },
  bodyContainer: {
    backgroundColor: 'white',
    color: 'black',
    flex: 1,
    maxHeight: '100%',
    overflow: 'auto',
  },
}));

const App = ({ body, header }) => (
  <section style={styles.container}>
    {header()}
    <section style={styles.bodyContainer} id="body-page-container">
      <ErrorCatcherHOC>{() => body()}</ErrorCatcherHOC>
    </section>
  </section>
);

App.propTypes = {
  body: PropTypes.func.isRequired,
  header: PropTypes.func.isRequired,
};

const renderApp = () => (
  <ReactRouter history={history}>
    <ThemeProvider theme={appTheme}>
      <App header={() => <Header />} body={() => <Router />} />
    </ThemeProvider>
  </ReactRouter>
);

const Root = () => {
  if (APP_SETTINGS.environment === 'development') {
    return <AppContainer>{renderApp()}</AppContainer>;
  }
  return renderApp();
};

export default Root;
