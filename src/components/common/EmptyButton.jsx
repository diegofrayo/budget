// npm libs
import React from 'react';
import PropTypes from 'prop-types';

// theme
import { createStyledComponent } from 'styles';

const ButtonElement = createStyledComponent(
  'button',
  () => `
    background-color: transparent;
    border: 0;
    cursor: pointer;
    outline: 0;
  `
);

const Button = ({ children, onClick }) => (
  <ButtonElement className="button" type="button" onClick={onClick}>
    {children}
  </ButtonElement>
);

Button.propTypes = {
  children: PropTypes.any.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
