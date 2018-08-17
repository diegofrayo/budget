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

export const sort = (attr = '', order = 'asc') => {
  let greater = 1;
  let smaller = -1;

  if (order === 'desc') {
    greater = -1;
    smaller = 1;
  }

  const sortFn = (a, b) => {
    let aAttr = a[attr];
    let bAttr = b[attr];

    if (aAttr === undefined || aAttr === null) {
      aAttr = '';
    }

    if (bAttr === undefined || bAttr === null) {
      bAttr = '';
    }

    aAttr = aAttr.toLowerCase();
    bAttr = bAttr.toLowerCase();

    if (aAttr === bAttr) {
      return 0;
    } else if (aAttr > bAttr) {
      return greater;
    }

    return smaller;
  };

  return sortFn;
};
