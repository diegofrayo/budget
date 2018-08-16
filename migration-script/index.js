const firebase = require('firebase');
const fs = require('fs');
const { JULY: data } = require('./data');

// ------------------------ Utils Functions ------------------------

const formatNumberLessThanZero = value => (value <= 9 ? `0${value}` : value);

const transformDate = date => {
  const items = date.split('/');
  return `${items[2]}/${formatNumberLessThanZero(Number(items[1]))}/${formatNumberLessThanZero(
    Number(items[0])
  )}`;
};

const sortByDate = (a, b) => {
  const aDate = a.date;
  const bDate = b.date;

  if (aDate > bDate) {
    return 1;
  }

  return -1;
};

// ------------------------ Transformations ------------------------

const dataTransformed = data.data
  .trim()
  .split('\n')
  .map(string => {
    return string.trim().split(',');
  })
  .map(item => {
    return {
      title: item[0],
      date: transformDate(item[1]),
      category: item[2].toLowerCase().replace(' ', '_'),
      amount: item[3].replace(/\./g, '').replace('$', ''),
      description: '',
    };
  })
  .sort(sortByDate);

console.log(dataTransformed);

const dataTransformedOnObject = dataTransformed.reduce((acum, current) => {
  const date = current.date.split('/')[2];
  if (acum[date] === undefined) acum[date] = []; // eslint-disable-line
  acum[date].push(current);
  return acum;
}, {});

console.log(dataTransformedOnObject);

// ------------------------ Firebase ------------------------

const config = JSON.parse(fs.readFileSync('./../config.app.json', 'utf8')).development;

firebase.initializeApp({
  apiKey: config.firebase_api_key,
  authDomain: config.firebase_auth_domain,
  databaseURL: config.firebase_database_url,
});

const connection = firebase.database().ref();

Object.entries(dataTransformedOnObject).forEach(([date, transactions]) => {
  const conn = connection.child(`budget/diegofrayo/transactions/2018/${data.month}/${date}`);
  transactions.forEach(transaction => {
    conn.push().set(transaction);
  });
});

setTimeout(() => process.exit(), 5000);
