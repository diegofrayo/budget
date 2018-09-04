// npm libs
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// styles
import { createClassname } from 'styles';

const Styles = {
  multiple: createClassname(() => `min-height: 100px`),
};

const Select = ({ id, name, value, options, className, onChange, ...rest }) => {
  return (
    <select
      name={name}
      id={id}
      value={value}
      className={classnames(className, rest.multiple && Styles.multiple)}
      onChange={onChange}
      {...rest}
    >
      {options.map(option => {
        return (
          <option
            key={option.value}
            value={option.value}
            data-selected={value.indexOf(option.value) !== -1}
          >
            {option.label}
          </option>
        );
      })}
    </select>
  );
};

Select.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.string]).isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
};

Select.defaultProps = {
  className: '',
};

export default Select;
