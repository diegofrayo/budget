// npm libs
import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const Dropdown = ({
  id,
  name,
  value,
  options,
  className,
  multiple,
  onChange,
  ...rest
}) => {
  return (
    <Select
      className={className}
      defaultValue={value}
      id={id}
      name={name}
      options={options}
      onChange={onChange}
      isMulti={multiple === true}
      {...rest}
    />
  );
};

Dropdown.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  multiple: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

Dropdown.defaultProps = {
  className: '',
  multiple: false,
};

export default Dropdown;
