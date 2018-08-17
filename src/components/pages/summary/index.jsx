// npm libs
import React from 'react';

// components
import PageContainer from 'components/layout/PageContainer';
import Tabs from 'components/common/Tabs';

// services
import { fetchTransactions } from 'services/firebase';

// constants
import { CATEGORIES, DAYS } from 'constants/index';

// styles
import { TransactionsContainer, Transaction, TransactionItem } from './styles';

// data
import DEFAULT_DATA from './data';

class Summary extends React.Component {
  state = {
    transactions: DEFAULT_DATA,
    // transactions: [],
  };

  componentDidMount() {
    // this.fetchTransactions();
  }

  formatDate = dateStr => {
    const date = new Date(dateStr);
    return `${DAYS[date.getDay()]}, ${date.getDate()}`;
  };

  fetchTransactions = () => {
    return fetchTransactions('2018', '08').then(transactions => {
      console.log(transactions);
      this.setState({ transactions });
    });
  };

  render() {
    return (
      <PageContainer>
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
                                  {transaction.amount}
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
