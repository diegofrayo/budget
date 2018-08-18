// npm libs
import React from 'react';
import PropTypes from 'prop-types';

const Select = ({ id, name, value, options, className, onChange }) => {
  return (
    <select name={name} id={id} value={value} className={className} onChange={onChange}>
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
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string.isRequired, value: PropTypes.string.isRequired })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
};

Select.defaultProps = {
  className: '',
};

export default Select;
