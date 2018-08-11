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
    errorMessage: 'Please type a valid title',
    inputProps: {},
    label: 'Title',
    required: true,
    type: 'text',
    validate: value => {
      return value || false;
    },
  },
  description: {
    element: 'textarea',
    errorMessage: 'Please type a valid description',
    inputProps: {},
    label: 'Description',
    required: false,
    type: 'text',
    validate: value => {
      return value || false;
    },
  },
  date: {
    defaultValue: getCurrentDate(),
    element: 'input',
    errorMessage: 'Please type a valid date',
    inputProps: {},
    label: 'Date',
    required: true,
    type: 'date',
    validate: value => {
      return value || false;
    },
  },
  amount: {
    defaultValue: 1000,
    element: 'input',
    errorMessage: 'Please type a valid amount',
    inputProps: {
      min: 1000,
      step: 1000,
    },
    label: 'Amount',
    required: true,
    type: 'number',
    validate: value => {
      return value || false;
    },
  },
  category: {
    component: Dropdown,
    defaultValue: 'comida',
    element: 'select',
    errorMessage: 'Please type a valid category',
    label: 'Category',
    required: true,
    type: 'text',
    inputProps: {
      options: [
        { label: 'Paseos', value: 'paseos' },
        { label: 'Entretenimiento', value: 'entretenimiento' },
        { label: 'Deporte', value: 'deporte' },
        { label: 'Comida', value: 'comida' },
        { label: 'Hogar', value: 'hogar' },
      ],
    },
    validate: value => {
      return value || false;
    },
  },
};
