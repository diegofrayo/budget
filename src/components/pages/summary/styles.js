// theme
import {
  createClassname,
  createStyledComponent,
  createStyledComponentWithProps,
  createStyles,
} from 'styles';

const DropdownStyles = {
  left: createClassname(
    theme => `
    margin-bottom: ${theme.spacing[3]};

    ${theme.mediaQueries.join([theme.mediaQueries.tablet.css, theme.mediaQueries.desktop.css])} {
      padding-right: ${theme.spacing[1]};
    }
`
  ),
  right: createClassname(
    theme => `
    margin-bottom: ${theme.spacing[3]};

    ${theme.mediaQueries.join([theme.mediaQueries.tablet.css, theme.mediaQueries.desktop.css])} {
      padding-left: ${theme.spacing[1]};
    }
`
  ),
};

const PanesStyles = {
  transactions: createClassname(
    theme => `
      padding: ${theme.spacing[0]};
    `
  ),
  summary: createClassname(
    theme => `
      padding: ${theme.spacing[5]} ${theme.spacing[4]};
    `
  ),
};

const TransactionsContainer = createStyledComponent(
  'section',
  theme => `
    margin-bottom: ${theme.spacing[0]};
    width: 100%;

    &:last-child {
      margin-bottom: 0;
    }

    .date {
      background-color: #eaeaea;
      border: 1px solid #dedede;
      font-weight: bold;
      padding: ${theme.spacing[0]} ${theme.spacing[1]};
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
      padding: ${theme.spacing[0]} ${theme.spacing[1]};

      .text {
        margin: ${theme.spacing[0]} 0;
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
      padding: ${theme.spacing[1]};

      .icon {
        color: #25b525;
        font-size: ${theme.fontSize[1]};
        margin-right: 0;
      }

      .text {
        font-size: ${theme.fontSize[3]};
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
      margin-right: ${theme.spacing[0]};
      position: relative;
      top: -2px;
    }

    ${theme.mediaQueries.mobile.css} {
      width: 100%;
    }

    ${TransactionItemStyles[item] || ''}
  `
);

const Table = createStyledComponent(
  'table',
  () => `
  max-width: 100%;
  width: 100%;

  .cell-header{
    background-color: #ececec;
    border: 1px solid #dadada;
    padding: 10px;
  }

  .cell-body{
    border: 1px solid #dadada;
    padding: 5px;
  }
  `
);

const TableContainer = createStyledComponent('section', () => ``);

export {
  DropdownStyles,
  PanesStyles,
  TransactionsContainer,
  Transaction,
  TransactionItem,
  TableContainer,
  Table,
};
