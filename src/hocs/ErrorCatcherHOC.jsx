/* eslint react/no-unescaped-entities: "off" */

// npm libs
import React from 'react';
import PropTypes from 'prop-types';

// theme
import { createStyledComponent } from 'styles/createStylesheet';

// components
import PageContainer from 'components/layout/PageContainer';

const Image = createStyledComponent(
  'img',
  () => `
    max-width: 400px;
    width: 100%;
  `
);

const Text = createStyledComponent(
  'p',
  theme => `
    color: #bd0d0d;
    font-size: ${theme.fontSize.large}px;
    font-weight: bold;
    margin-top: ${theme.spacing.xlarge}px;
    text-align: center;
    text-transform: uppercase;
  `
);

class ErrorHOC extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
  };

  state = {
    hasError: false,
  };

  componentDidCatch(error, details) {
    console.group();
    console.log('Error:');
    console.log(error);
    console.log('Details:');
    console.log(details);
    console.groupEnd();
    this.setState(() => ({
      hasError: true,
    }));
  }

  render() {
    if (this.state.hasError) {
      return (
        <PageContainer>
          <Image src={`${APP_SETTINGS.assets_path}/images/monkey.png`} alt="monkey" />
          <Text>
            Hi there, I'm sorry, I will fix it
            <br />
            Someday...
          </Text>
        </PageContainer>
      );
    }
    return this.props.children();
  }
}

export default ErrorHOC;
