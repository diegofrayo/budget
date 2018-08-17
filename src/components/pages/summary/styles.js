// theme
import {
  createStyledComponent,
  createStyledComponentWithProps,
  createStyles,
} from 'styles/createStylesheet';

const TransactionsContainer = createStyledComponent(
  'section',
  theme => `
    margin-bottom: ${theme.spacing.xlarge}px;
    width: 100%;

    &:last-child {
      margin-bottom: 0;
    }

    .date {
      background-color: #eaeaea;
      border: 1px solid #dedede;
      font-weight: bold;
      padding: ${theme.spacing.small}px ${theme.spacing.base}px;
      text-transform: uppercase;
    }

    .transactions-container {
      border: 1px solid #dedede;
    }
  `
);

const Transaction = createStyledComponent(
  'section',
  () => `
    background-color: #f5f5f5;
    border-bottom: 1px solid #dedede;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;

    &:last-child {
      border-bottom: none;
    }
  `
);

const TransactionItemStyles = {
  title: createStyles(
    theme => `
      align-items: flex-start;
      flex-direction: column;
      justify-content: center;
      width: 60%;
      padding: ${theme.spacing.small}px ${theme.spacing.base}px;

      .text {
        margin: ${theme.spacing.small}px 0;
      }

      .text-title {
        font-weight: bold;
      }
  `
  ),
  amount: createStyles(
    theme => `
      justify-content: flex-end;
      width: 40%;
      padding: ${theme.spacing.base}px;

      .icon {
        color: #25b525;
        font-size: ${theme.fontSize.small};
        margin-right: 0;
      }

      .text {
        font-size: ${theme.fontSize.medium};
        font-weight: bold;
      }
  `
  ),
};

const TransactionItem = createStyledComponentWithProps(
  'section',
  ({ theme, item }) => `
    align-items: center;
    display: flex;

    .icon {
      color: #4c4c4c;
      margin-right: ${theme.spacing.small}px;
      position: relative;
      top: -2px;
    }

    ${theme.mediaQueries.mobile.css} {
      width: 100%;
    }

    ${TransactionItemStyles[item] || ''}
  `
);

export { TransactionsContainer, Transaction, TransactionItem };
