// npm libs
import React from 'react';
import PropTypes from 'prop-types';

// theme
import { createStyledComponentWithProps } from 'styles';

// components
import Box from 'components/common/Box';

const Container = createStyledComponentWithProps(
  Box,
  ({ theme }) => `
    margin: 0 auto;
    max-width: ${theme.maxWidthContainer}px;
    padding: ${theme.spacing[4]} ${theme.spacing[3]};
  `
);

const PageContainer = ({ children, 'expand-y': expandY }) => (
  <Container expand-y={expandY} column align="center">
    {children}
  </Container>
);

PageContainer.propTypes = {
  children: PropTypes.any.isRequired,
  'expand-y': PropTypes.bool,
};

PageContainer.defaultProps = {
  'expand-y': false,
};

export default PageContainer;
