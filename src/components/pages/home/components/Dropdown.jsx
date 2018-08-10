// npm libs
import React from 'react';
import PropTypes from 'prop-types';

const Select = ({ id, name, value, options, className, onChange, defaultValue }) => {
  return (
    <select
      name={name}
      id={id}
      value={value || defaultValue}
      className={className}
      onChange={onChange}
    >
      {options.map(option => {
        return (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        );
      })}
    </select>
  );
};

Select.propTypes = {
  className: PropTypes.string.isRequired,
  defaultValue: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string.isRequired, value: PropTypes.string.isRequired })
  ).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

Select.defaultProps = {
  value: '',
};

export default Select;
