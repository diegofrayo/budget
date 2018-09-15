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
    defaultValue: ['comidas'],
    element: 'dropdown',
    errorMessage: 'Please select a category',
    label: 'Category',
    required: true,
    inputProps: {
      type: 'select',
      options: Object.values(CATEGORIES).slice(1),
      multiple: true,
    },
    handlers: {
      onChange: event => {
        const { options, name, value: optionValue } = event.currentTarget;

        const value = [];

        // eslint-disable-next-line
        for (let i = 0, length = options.length; i < length; i += 1) {
          const option = options[i];
          const isOptionSelected = option.getAttribute('data-selected') === 'true';

          if (option.value === optionValue && isOptionSelected) {
            continue;
          }

          if (
            (isOptionSelected && option.value !== optionValue) ||
            (!isOptionSelected && option.value === optionValue)
          ) {
            value.push(option.value);
          }
        }

        return { name, value };
      },
    },
    validate: value => {
      return validator(value)
        .array()
        .minLength(1)
        .exec();
    },
  },
};
