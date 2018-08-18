// services
import { getCurrentDate } from 'services/utilities';

// constants
import { CATEGORIES } from 'constants/index';

// libs
import validator from 'lib/validator';

// components
import Dropdown from 'components/common/Dropdown';

export default {
  title: {
    // defaultValue: 'Title',
    element: 'input',
    errorMessage: 'Please type a valid title',
    label: 'Title',
    required: true,
    inputProps: { type: 'text' },
    validate: value => {
      return validator(value)
        .string()
        .exec();
    },
  },
  /*
  description: {
    element: 'textarea',
    errorMessage: 'Please type a valid description',
    label: 'Description',
    required: false,
    inputProps: {},
  },
  */
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
      return validator(value)
        .string()
        .regex(/(\d{4})-(\d{2})-(\d{2})/)
        .exec();
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
      return validator(value)
        .number()
        .min(1000)
        .exec();
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
      options: Object.values(CATEGORIES),
    },
    validate: value => {
      return validator(value)
        .string()
        .notAllowEmpty()
        .exec();
    },
  },
};
