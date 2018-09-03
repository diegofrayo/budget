// npm libs
import React from 'react';
import PropTypes from 'prop-types';

// components
import EmptyButton from 'components/common/EmptyButton';

// theme
import { createStyledComponentWithProps } from 'styles';

const Container = createStyledComponentWithProps(
  'section',
  ({ theme, type, show }) => `
    border-radius: 5px;
    display: ${show === true ? 'flex' : 'none'};
    font-weight: bold;
    margin-top: ${theme.spacing[5]};
    padding: ${theme.spacing[3]};
    position: relative;
    width: 100%;

    .button {
      color: inherit;
      position: absolute;
      right: ${theme.spacing[2]};
      top: ${theme.spacing[2]};
    }

    .material-icons {
      text-shadow: 1px 1px 2px darkgrey;
    }

    ${
      type === 'success'
        ? `
      color: #66a20a;
      background-color: #ebffe2;
      border: 1px solid #cbefc0;
    `
        : ''
    }

    ${
      type === 'error'
        ? `
      color: #bd0d0d;
      background-color: #ffebeb;
      border: 1px solid #ffd1d1;
    `
        : ''
    }
  `
);

const ResponseMessage = ({ show, type, message, closeResponseMessageHandler }) => (
  <Container type={type} show={show}>
    <EmptyButton onClick={closeResponseMessageHandler}>
      <i className="material-icons">close</i>
    </EmptyButton>
    <p>{message}</p>
  </Container>
);

ResponseMessage.propTypes = {
  message: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  closeResponseMessageHandler: PropTypes.func.isRequired,
};

export default ResponseMessage;
