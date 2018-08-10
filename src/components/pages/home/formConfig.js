// components
import Dropdown from './components/Dropdown';

const formatNumber = value => (value <= 9 ? `0${value}` : value);

const getCurrentDate = () => {
  const date = new Date();
  return `${date.getFullYear()}-${formatNumber(date.getMonth() + 1)}-${formatNumber(
    date.getDate()
  )}`;
};

export default {
  title: {
    element: 'input',
    label: 'Title',
    errorMessage: 'Please type a valid title',
    required: true,
    validate: value => {
      return value || false;
    },
    inputProps: {
      type: 'text',
    },
  },
  description: {
    element: 'textarea',
    label: 'Description',
    errorMessage: 'Please type a valid description',
    required: false,
    validate: value => {
      return value || false;
    },
    inputProps: {
      type: 'text',
    },
  },
  date: {
    element: 'input',
    label: 'Date',
    errorMessage: 'Please type a valid date',
    required: true,
    validate: value => {
      return value || false;
    },
    inputProps: {
      defaultValue: getCurrentDate(),
      type: 'date',
    },
  },
  amount: {
    element: 'input',
    label: 'Amount',
    errorMessage: 'Please type a valid amount',
    required: true,
    validate: value => {
      return value || false;
    },
    inputProps: {
      type: 'number',
    },
  },
  category: {
    element: 'select',
    label: 'Category',
    errorMessage: 'Please type a valid category',
    required: false,
    validate: value => {
      return value || false;
    },
    component: Dropdown,
    inputProps: {
      defaultValue: 'comida',
      options: [
        { label: 'Paseos', value: 'paseos' },
        { label: 'Entretenimiento', value: 'entretenimiento' },
        { label: 'Deporte', value: 'deporte' },
        { label: 'Comida', value: 'comida' },
        { label: 'Hogar', value: 'hogar' },
      ],
      type: 'text',
    },
  },
};
