// npm libs
import React from 'react';

// components
import PageContainer from 'components/layout/PageContainer';

// services
import { fetchTransactions } from 'services/firebase';

// constants
import { CATEGORIES } from 'constants/index';

// styles
import { Title, TransactionsContainer, Transaction, TransactionItem } from './styles';

// data
import DEFAULT_DATA from './data';

class Summary extends React.Component {
  state = {
    transactions: DEFAULT_DATA,
  };

  componentDidMount() {
    // this.fetchTransactions();
  }

  fetchTransactions = () => {
    return fetchTransactions('2018', '07').then(transactions => {
      console.log(transactions);
      this.setState({ transactions });
    });
  };

  render() {
    return (
      <PageContainer>
        <Title>Transactions</Title>
        {this.state.transactions.map(transactionsByDay => {
          return (
            <TransactionsContainer key={transactionsByDay.date}>
              <h2 className="date">{transactionsByDay.date}</h2>
              <section className="transactions-container">
                {transactionsByDay.transactions.map(transaction => {
                  return (
                    <Transaction key={transaction.id}>
                      <TransactionItem item="title">
                        <p className="text">
                          <i className="material-icons icon">description</i>
                          {transaction.title}
                        </p>
                      </TransactionItem>
                      <TransactionItem item="category">
                        <p className="text">
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
        })}
      </PageContainer>
    );
  }
}

export default Summary;