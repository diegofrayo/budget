export const createCustomError = data => {
  const error = new Error('');
  error.data = data;
  return error;
};

export const formatNumberLessThanZero = value => (value <= 9 ? `0${value}` : value);

export const getCurrentDate = () => {
  const date = new Date();
  return `${date.getFullYear()}-${formatNumberLessThanZero(
    date.getMonth() + 1
  )}-${formatNumberLessThanZero(date.getDate())}`;
};
