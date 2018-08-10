module.exports = (env = {}) => {

  const fs = require('fs');
  const path = require('path');
  const webpack = require('webpack');
  const webpackConfig = require('./config/webpack.config.js');

  const ENVIRONMENT = process.env.NODE_ENV || 'development';
  let isDevelopmentEnv = ENVIRONMENT === 'development';
  let isESLintEnabled = !env.disableLint;
  let settings = {};

  try {
    settings = JSON.parse(fs.readFileSync('./config.app.json', 'utf8'))[ENVIRONMENT];
  } catch (error) {
    console.log(error);
    process.exit();
  }

  const config = Object.assign(
    {},
    {
      context: __dirname,
      entry: webpackConfig.entry(isDevelopmentEnv),
      plugins: webpackConfig.plugins({
        isDevelopmentEnv,
        settings,
        isESLintEnabled,
      }),
      resolve: {
        extensions: ['.js', '.jsx'],
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      },
      module: {
        rules: [
          webpackConfig.babel(isDevelopmentEnv),
          webpackConfig.eslint(isESLintEnabled),
        ],
      },
    },
    webpackConfig.config(isDevelopmentEnv),
  );

  return config;
};
