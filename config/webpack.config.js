const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {

  config: (isDevelopmentEnv) => {

    if (isDevelopmentEnv) {
      return {
        devtool: 'source-map',
        mode: 'development',
        output: {
          filename: 'bundle.js',
          path: path.resolve(__dirname, '../build/js'),
          publicPath: '/js/',
        },
      };
    }

    return {
      mode: 'production',
      output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '../build'),
      },
    };
  },

  entry: isDevelopmentEnv => {

    let entry = ['@babel/polyfill', 'whatwg-fetch', './src/index.jsx'];

    if (isDevelopmentEnv) {
      entry = entry.concat(['react-hot-loader/patch', 'webpack-hot-middleware/client?overlay=false']);
    }

    return entry;
  },

  styles: () => {
    return {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    };
  },

  plugins: ({ isDevelopmentEnv, isESLintEnabled, settings }) => {

    let plugins = [new webpack.DefinePlugin({ APP_SETTINGS: JSON.stringify(settings) })];

    if (isDevelopmentEnv) {
      plugins = plugins.concat([new webpack.NamedModulesPlugin(), new webpack.HotModuleReplacementPlugin()]);
    } else {
      plugins = plugins.concat([
        new webpack.optimize.OccurrenceOrderPlugin(),
        new CleanWebpackPlugin(['build'], {
          root: path.join(__dirname, '../'),
          verbose: true,
          dry: false,
        }),
      ]);
    }

    if (isESLintEnabled) {
      plugins.unshift(
        new webpack.LoaderOptionsPlugin({
          options: {
            eslint: {
              configFile: path.join(__dirname, './../.eslintrc'),
            },
          },
        }),
      );
    }

    return plugins;
  },

  babel: isDevelopmentEnv => {

    const babelConfig = {
      test: /(\.js|.jsx)$/,
      exclude: /(node_modules|webpack_cache|config)/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            plugins: [
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-proposal-class-properties',
            ],
            presets: ['@babel/preset-env', '@babel/react'],
            env: {
              production: {
                plugins: ['transform-remove-console', 'react-optimize'],
              },
            },
          },
        },
      ],
    };

    if (isDevelopmentEnv) {
      babelConfig.use[0].options.plugins.unshift('react-hot-loader/babel');
    }

    return babelConfig;
  },

  eslint: isESLintEnabled => {

    if (isESLintEnabled) {
      return {
        exclude: /(node_modules|webpack_cache|config)/,
        include: /(src)/,
        loader: 'eslint-loader',
        test: /(\.js|.jsx)$/,
      };
    }

    return {};
  },

};
