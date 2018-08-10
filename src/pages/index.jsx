// npm libs
import React from 'react';
import PropTypes from 'prop-types';
import ReactRouter from 'react-router-dom/Router';
import { AppContainer } from 'react-hot-loader';
import { ThemeProvider } from 'emotion-theming';

// components
import Header from 'components/layout/Header';
import ErrorBoundary from 'hocs/ErrorBoundary';

// Routing
import { Router, history } from 'routing';

// theme
import { createPlainStylesObject, theme as appTheme } from 'styles/createStylesheet';

const styles = createPlainStylesObject(theme => ({
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
    overflow: 'auto',
    padding: theme.spacing.medium,
  },
}));

const App = ({ body, header }) => (
  <section style={styles.container}>
    {header()}
    <ErrorBoundary>{() => <section style={styles.bodyContainer}>{body()}</section>}</ErrorBoundary>
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
