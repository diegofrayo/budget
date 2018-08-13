// npm libs
import React from 'react';
import PropTypes from 'prop-types';

// theme
import { createStyledComponentWithProps } from 'styles/createStylesheet';

const Container = createStyledComponentWithProps(
  'section',
  ({ theme, fullHeight }) => `
    align-items: center;
    display: flex;
    flex-direction: column;
    height: ${fullHeight ? '100%' : 'auto'};
    justify-content: center;
    margin: 0 auto;
    max-width: ${theme.maxWidthContainer}px;
    padding: ${theme.spacing.xlarge}px ${theme.spacing.large}px;
  `
);

const PageContainer = ({ children, fullHeight }) => <Container fullHeight={fullHeight}>{children}</Container>;

PageContainer.propTypes = {
  children: PropTypes.any.isRequired,
  fullHeight: PropTypes.bool,
};

PageContainer.defaultProps = {
  fullHeight: false,
};

export default PageContainer;
