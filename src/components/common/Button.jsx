// npm libs
import React from 'react';
import PropTypes from 'prop-types';

// theme
import { createStyledComponentWithProps } from 'styles/createStylesheet';

const ButtonElement = createStyledComponentWithProps(
  'button',
  ({ theme, disabled }) => `
    background-color: black;
    color: white;
    cursor: pointer;
    font-size: ${theme.fontSize.normal};
    font-weight: bold;
    height: 50px;
    padding: ${theme.spacing.small}px;
    text-align: center;
    text-transform: uppercase;
    transition: all 0.3s linear;
    width: 100%;

    &:hover {
      background-color: #333333;
    }

    .loader {
      margin-right: ${theme.spacing.small}px;
    }

    ${
      disabled
        ? `
      background-color: gainsboro !important;
      color: #6d6d6d;
      cursor: not-allowed;
    `
        : ''
    }
  `
);

const Button = ({ children, onClick, loading, disabled, ...moreProps }) => (
  <ButtonElement className="button" onClick={onClick} disabled={disabled || loading} {...moreProps}>
    {loading && (
      <img src={`${APP_SETTINGS.assets_path}/images/loader.svg`} alt="loader" className="loader" />
    )}
    <span>{children}</span>
  </ButtonElement>
);

Button.propTypes = {
  children: PropTypes.any.isRequired,
  disabled: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  onClick: () => {},
};

export default Button;
