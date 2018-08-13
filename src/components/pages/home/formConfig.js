// services
import { getCurrentDate } from 'services/utilities';

// components
import Dropdown from './components/Dropdown';

export default {
  title: {
    element: 'input',
    errorMessage: 'Please type a valid title',
    label: 'Title',
    required: true,
    inputProps: { type: 'text' },
    validate: value => {
      return value || false;
    },
  },
  description: {
    element: 'textarea',
    errorMessage: 'Please type a valid description',
    label: 'Description',
    required: false,
    inputProps: { type: 'text' },
    validate: value => {
      return value || false;
    },
  },
  date: {
    defaultValue: getCurrentDate(),
    element: 'input',
    errorMessage: 'Please type a valid date',
    label: 'Date',
    required: true,
    inputProps: {
      type: 'date',
    },
    validate: value => {
      return value || false;
    },
  },
  amount: {
    defaultValue: 1000,
    element: 'input',
    errorMessage: 'Please type a valid amount',
    label: 'Amount',
    required: true,
    inputProps: {
      min: 1000,
      step: 1000,
      type: 'number',
    },
    validate: value => {
      return value || false;
    },
  },
  category: {
    component: Dropdown,
    defaultValue: 'comida',
    element: 'dropdown',
    errorMessage: 'Please type a valid category',
    label: 'Category',
    required: true,
    inputProps: {
      type: 'select',
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
