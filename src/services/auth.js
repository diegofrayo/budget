// npm libs
import firebase from 'firebase/app';
import 'firebase/auth';

let userSession = { isGuest: true, username: 'guest' };

export const signIn = ({ email, password }) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const signUp = ({ email, password }) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
};

export function signOut() {
  firebase.auth().signOut();
}

export const onAuthStateChanged = handler => {
  firebase.auth().onAuthStateChanged(handler);
};

export const updateUserSession = session => {
  userSession = session;
  return userSession;
};

export const getUserSession = () => {
  return userSession;
};
