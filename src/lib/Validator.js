const isEmail = email => {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

const Validator = (value, isValid) => {
  return {
    string: () => {
      const validationResult = isValid && typeof value === 'string';
      return Validator(value, validationResult);
    },
    number: () => {
      const transformedValue = Number(value);
      const validationResult =
        isValid && typeof transformedValue === 'number' && Number.isNaN(transformedValue) === false;
      return Validator(transformedValue, validationResult);
    },

    email: () => {
      const validationResult = isValid && isEmail(value);
      return Validator(value, validationResult);
    },
    min: min => {
      const validationResult = isValid && value >= min;
      return Validator(value, validationResult);
    },
    minLength: length => {
      const validationResult = isValid && value.length >= length;
      return Validator(value, validationResult);
    },
    notAllowEmpty: () => {
      const validationResult = isValid && value !== '';
      return Validator(value, validationResult);
    },
    regex: regex => {
      const regexResult = regex.exec(value);
      const validationResult =
        isValid && regexResult !== null && regexResult[0] === regexResult.input;
      return Validator(value, validationResult);
    },

    exec: () => {
      return isValid;
    },
  };
};

export default value => {
  return Validator(value, true);
};
