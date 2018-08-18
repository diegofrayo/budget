// npm libs
import React from 'react';

// components
import Dropdown from 'components/common/Dropdown';
import FormElement from 'components/common/FormElement';
import PageContainer from 'components/layout/PageContainer';
import Tabs from 'components/common/Tabs';

// services
import { fetchTransactions } from 'services/firebase';
import { createArray, formatNumberLessThanZero } from 'services/utilities';

// constants
import { CATEGORIES, DAYS, YEARS, MONTHS } from 'constants/index';

// styles
import { TransactionsContainer, Transaction, TransactionItem } from './styles';

// data
import DEFAULT_DATA from './data';

class Summary extends React.Component {
  state = {
    // transactions: [],
    transactions: DEFAULT_DATA,
    selectedYear: `${new Date().getFullYear()}`,
    selectedMonth: formatNumberLessThanZero(new Date().getMonth() + 1),
  };

  componentDidMount() {
    // this.fetchTransactions(this.state.selectedYear, this.state.selectedMonth);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.selectedYear !== prevState.selectedYear ||
      this.state.selectedMonth !== prevState.selectedMonth
    ) {
      this.fetchTransactions(this.state.selectedYear, this.state.selectedMonth);
    }
  }

  onChangeDropdown = event => {
    const attrName = event.currentTarget.name === 'years' ? 'selectedYear' : 'selectedMonth';
    const { value } = event.currentTarget;
    this.setState({ [attrName]: value });
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
      console.log(transactions);
      this.setState({ transactions });
    });
  };

  render() {
    return (
      <PageContainer>
        <FormElement
          label="Select a Year"
          name="years"
          value={this.state.selectedYear}
          element="dropdown"
          component={Dropdown}
          inputProps={{ type: 'select', options: Object.values(YEARS) }}
          onChangeInput={this.onChangeDropdown}
        />
        <FormElement
          label="Select a Month"
          name="months"
          value={this.state.selectedMonth}
          element="dropdown"
          component={Dropdown}
          inputProps={{ type: 'select', options: Object.values(MONTHS) }}
          onChangeInput={this.onChangeDropdown}
        />
        <Tabs
          tabs={[
            { key: 'transactions', text: 'Transactions' },
            { key: 'summary', text: 'Summary' },
          ]}
          panes={[
            {
              key: 'transactions',
              render: () => {
                return this.state.transactions.map(transactionsByDay => {
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
                                  <i className="material-icons icon">folder</i>
                                  {CATEGORIES[transaction.category].label}
                                </p>
                              </TransactionItem>
                              <TransactionItem item="amount">
                                <p className="text">
                                  <i className="material-icons icon">attach_money</i>
                                  {this.formatAmount(transaction.amount)}
                                </p>
                              </TransactionItem>
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
              render: () => {
                return <p>Summary</p>;
              },
            },
          ]}
        />
      </PageContainer>
    );
  }
}

export default Summary;
