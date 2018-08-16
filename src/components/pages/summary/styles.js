// theme
import {
  createStyledComponent,
  createStyledComponentWithProps,
  createStyles,
} from 'styles/createStylesheet';

const Title = createStyledComponent(
  'h1',
  theme => `
    font-size: ${theme.fontSize.xlarge};
    margin-bottom: 1em;
  `
);

const TransactionsContainer = createStyledComponent(
  'section',
  theme => `
    margin-bottom: ${theme.spacing.xlarge * 1.5}px;
    width: 100%;

    .date {
      margin-bottom: ${theme.spacing.small}px;
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
    () => `
      width: 100%;
  `
  ),
  category: createStyles(
    theme => `
      width: 50%;

      ${theme.mediaQueries.mobile.css} {
        width: 70%;
      }
  `
  ),
  amount: createStyles(
    theme => `
      justify-content: flex-end;
      width: 50%;

      .icon {
        color: #25b525;
        font-size: ${theme.fontSize.small};
        margin-right: 0;
      }

      .text {
        font-size: ${theme.fontSize.xlarge};
        font-weight: bold;
      }

      ${theme.mediaQueries.mobile.css} {
        width: 30%;
      }
  `
  ),
};

const TransactionItem = createStyledComponentWithProps(
  'section',
  ({ theme, item }) => `
    align-items: center;
    display: flex;
    padding: ${theme.spacing.base}px ${theme.spacing.base}px 0;

    .icon {
      color: #4c4c4c;
      margin-right: ${theme.spacing.small}px;
      position: relative;
      top: -2px;
    }

    .text {
      word-break: break-all;
    }

    ${TransactionItemStyles[item] || ''}
  `
);

export { Title, TransactionsContainer, Transaction, TransactionItem };
