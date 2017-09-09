import * as firebase from 'firebase';
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAWBZPThtjYc-K0P6OhVYrKv9yLT2y7XNM",
  authDomain: "sleepover-pennapps2017.firebaseapp.com",
  databaseURL: "https://sleepover-pennapps2017.firebaseio.com",
  storageBucket: "sleepover-pennapps2017.appspot.com",
  messagingSenderId: "990954020304"
};

firebase.initializeApp(firebaseConfig)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth
export const user = firebase.auth().currentUser
