// npm libs
import firebase from 'firebase/app';
import 'firebase/auth';

export const logIn = ({ email, password }) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const signUp = ({ email, password }) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
};
