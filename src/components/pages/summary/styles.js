// theme
import {
  createClassname,
  createStyledComponent,
  createStyledComponentWithProps,
  createStyles,
} from 'styles';

const DropdownStyles = {
  left: {
    container: createClassname(
      theme => `
      margin-bottom: ${theme.spacing[3]};

      ${theme.mediaQueries.join([
        theme.mediaQueries.tablet.css,
        theme.mediaQueries.desktop.css,
      ])} {
        padding-right: ${theme.spacing[1]};
      }
`
    ),
    input: createClassname(() => `padding: 0;`),
  },
  right: {
    container: createClassname(
      theme => `
      margin-bottom: ${theme.spacing[3]};

      ${theme.mediaQueries.join([
        theme.mediaQueries.tablet.css,
        theme.mediaQueries.desktop.css,
      ])} {
        padding-left: ${theme.spacing[1]};
      }
`
    ),
    input: createClassname(() => `padding: 0;`),
  },
};

const PanesStyles = {
  transactions: createClassname(
    theme => `
      padding: ${theme.spacing[0]};
    `
  ),
  summary: createClassname(
    theme => `
      padding: ${theme.spacing[0]};
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
      width: 75%;
      padding: ${theme.spacing[0]} ${theme.spacing[1]};

      .text {
        margin: ${theme.spacing[0]} 0;
      }

      .text-title {
        font-weight: bold;
      }

      .category-item {
        background-color: #4c5661;
        border-radius: 5px;
        color: white;
        display: inline-block;
        font-size: ${theme.fontSize[1]};
        font-weight: bold;
        margin: 2px 4px;
        margin-left: 0;
        padding: ${theme.spacing[0]} ${theme.spacing[1]} 1px;
      }

      .icon {
        color: white;
        margin-right: 3px;
        position: relative;
        top: -2px;
      }
  `
  ),
  amount: createStyles(
    theme => `
      justify-content: flex-end;
      width: 25%;
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
    min-width: 500px;
    table-layout: fixed;
    width: 100%;
    word-break: break-all;

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

const TableContainer = createStyledComponent(
  'section',
  theme => `
    overflow: auto;
    margin: 0 auto;

    @media screen and (max-width : 400px) {
      border: 1px solid #dddddd;
      width: 250px;
    }

    @media screen and (min-width: 401px) and (max-width : 500px) {
      width: 350px;
    }

    @media screen and (min-width: 501px) and (max-width : 600px) {
      width: 450px;
    }

    ${theme.mediaQueries.no_mobile.css} {
      width: 100%;
    }
  `
);

export {
  DropdownStyles,
  PanesStyles,
  TransactionsContainer,
  Transaction,
  TransactionItem,
  TableContainer,
  Table,
};
