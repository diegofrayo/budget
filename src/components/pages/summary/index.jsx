// npm libs
import React from 'react';
import classnames from 'classnames';

// components
import Box from 'components/common/Box';
import Dropdown from 'components/common/Dropdown';
import FormElement from 'components/common/FormElement';
import PageContainer from 'components/layout/PageContainer';
import Tabs from 'components/common/Tabs';

// services
import { fetchTransactions } from 'services/firebase';
import { createArray, sort } from 'services/utilities';

// constants
import { CATEGORIES, DAYS, YEARS, MONTHS } from 'constants/index';

// styles
import {
  DeleteButton as DeleteButtonStyles,
  DropdownStyles,
  PanesStyles,
  TransactionsContainer,
  Transaction,
  TransactionItem,
  TableContainer,
  Table,
} from './styles';

const DeleteButton = props => {
  return (
    <i className={classnames('material-icons', DeleteButtonStyles)} {...props}>
      delete
    </i>
  );
};

class Summary extends React.Component {
  state = {
    transactions: { transactions: [], stats: {} },
    selectedYear: (currentYear => ({
      value: currentYear,
      label: currentYear,
    }))(new Date().getFullYear()),
    selectedMonth: (currentMonth => {
      return Object.values(MONTHS)[currentMonth];
    })(new Date().getMonth()),
  };

  componentDidMount() {
    if (APP_SETTINGS.environment !== 'development') {
      this.fetchTransactions(
        this.state.selectedYear.value,
        this.state.selectedMonth.value
      );
      import('./../../../services/firebase').then(moduleLoaded => {
        this.deleteTransaction = moduleLoaded.deleteTransaction;
      });
    } else {
      import('./../../../services/mocks').then(moduleLoaded => {
        this.deleteTransaction = moduleLoaded.deleteTransaction;
      });
      import('./data').then(moduleLoaded => {
        this.setState({ transactions: moduleLoaded.default });
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.selectedYear.value !== prevState.selectedYear.value ||
      this.state.selectedMonth.value !== prevState.selectedMonth.value
    ) {
      this.fetchTransactions(
        this.state.selectedYear.value,
        this.state.selectedMonth.value
      );
    }
  }

  onChangeYearDropdown = value => {
    this.setState({ selectedYear: value });
  };

  onChangeMonthDropdown = value => {
    this.setState({ selectedMonth: value });
  };

  formatDate = dateStr => {
    const date = new Date(dateStr);
    return `${DAYS[date.getDay()]}, ${date.getDate()}`;
  };

  formatAmount = amount => {
    const var1 = `${Math.round(amount / 1000)}`.length;
    let result = `${amount}`;

    if (var1 <= 3) {
      return `${result.substring(0, var1)}.${result.substring(var1)}`;
    }

    const var2 = Math.round(var1 / 3);
    const var3 = var1 % 3 === 0 ? 3 : var1 % 3;

    createArray(var2).forEach((item, index) => {
      const indexPoint = index * 3 + index + var3;
      result = `${result.substring(0, indexPoint)}.${result.substring(indexPoint)}`;
    });

    return result;
  };

  fetchTransactions = (year, month) => {
    return fetchTransactions(year, month).then(transactions => {
      this.setState({
        transactions: {
          stats: transactions.stats,
          transactions: transactions.transactions.sort(sort('date', 'asc')),
        },
      });
    });
  };

  deleteTransactionHandler = () => {
    console.log('this');
    alert('To Do: Implement this feature');
  };

  // eslint-disable-next-line
  sortStats = ([keyA, valueA], [keyB, valueB]) => {
    if (valueA.total === valueB.total) {
      return 0;
    } else if (valueA.total > valueB.total) {
      return -1;
    }

    return 1;
  };

  render() {
    return (
      <PageContainer>
        <Box row expand-x>
          <Box
            column
            w={['100%', '50%', '50%']}
            className={DropdownStyles.left.container}
          >
            <FormElement
              label="Select a Year"
              name="years"
              defaultValue={this.state.selectedYear}
              value={this.state.selectedYear}
              element="dropdown"
              component={Dropdown}
              inputProps={{
                type: 'select',
                options: Object.values(YEARS),
                className: DropdownStyles.left.input,
              }}
              onChangeInput={this.onChangeYearDropdown}
            />
          </Box>
          <Box
            column
            w={['100%', '50%', '50%']}
            className={DropdownStyles.right.container}
          >
            <FormElement
              label="Select a Month"
              name="months"
              defaultValue={this.state.selectedMonth}
              value={this.state.selectedMonth}
              element="dropdown"
              component={Dropdown}
              inputProps={{
                type: 'select',
                options: Object.values(MONTHS),
                className: DropdownStyles.right.input,
              }}
              onChangeInput={this.onChangeMonthDropdown}
            />
          </Box>
        </Box>
        <Tabs
          tabs={[
            { key: 'transactions', text: 'Transactions' },
            { key: 'summary', text: 'Summary' },
          ]}
          panes={[
            {
              key: 'transactions',
              className: PanesStyles.transactions,
              render: () => {
                return this.state.transactions.transactions.map(transactionsByDay => {
                  return (
                    <TransactionsContainer key={transactionsByDay.date}>
                      <p className="date">{this.formatDate(transactionsByDay.date)}</p>
                      <section className="transactions-container">
                        {transactionsByDay.transactions.map(transaction => {
                          return (
                            <Transaction key={transaction.id}>
                              <TransactionItem item="title">
                                <p className="text text-title">{transaction.title}</p>
                                <p className="text text-category">
                                  {transaction.category.map(category => {
                                    return (
                                      <span
                                        className="category-item"
                                        key={`${transaction.id}-${category}`}
                                      >
                                        <i className="material-icons icon">folder</i>
                                        {CATEGORIES[category].label}
                                      </span>
                                    );
                                  })}
                                </p>
                              </TransactionItem>
                              <TransactionItem item="amount">
                                <p className="text">
                                  <i className="material-icons icon">attach_money</i>
                                  {this.formatAmount(transaction.amount)}
                                </p>
                              </TransactionItem>
                              <DeleteButton onClick={this.deleteTransactionHandler} />
                            </Transaction>
                          );
                        })}
                      </section>
                    </TransactionsContainer>
                  );
                });
              },
            },
            {
              key: 'summary',
              className: PanesStyles.summary,
              render: () => {
                if (!this.state.transactions.stats.categories) return null;
                return (
                  <TableContainer>
                    <Table>
                      <thead>
                        <tr>
                          <th className="cell-header">Category</th>
                          <th className="cell-header">Amount</th>
                          <th className="cell-header"># Transactions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(this.state.transactions.stats.categories)
                          .sort(this.sortStats)
                          .map(([key, value]) => {
                            return (
                              <tr key={key}>
                                <td className="cell-body">{CATEGORIES[key].label}</td>
                                <td className="cell-body u-text-center">
                                  ${this.formatAmount(value.total)}
                                </td>
                                <td className="cell-body u-text-center">
                                  {value.transactions}
                                </td>
                              </tr>
                            );
                          })}
                        <tr>
                          <td className="cell-body" />
                          <td className="cell-body u-text-center">
                            <strong>
                              {this.formatAmount(
                                this.state.transactions.stats.totalAmount
                              )}
                            </strong>
                          </td>
                          <td className="cell-body u-text-center">
                            <strong>
                              {this.state.transactions.stats.totalTransactions}
                            </strong>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </TableContainer>
                );
              },
            },
          ]}
        />
      </PageContainer>
    );
  }
}

export default Summary;
