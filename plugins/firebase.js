import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';
import 'firebase/storage';


const config = {
  apiKey: "AIzaSyCs1ZWYpBkq-iH1wyPoQDdyBwPfhvTZmc0",
  authDomain: "klkrd.com",
  databaseURL: "https://kikrd-ef495.firebaseio.com",
  projectId: "kikrd-ef495",
  storageBucket: "kikrd-ef495.appspot.com",
  messagingSenderId: "1060482020142",
  appId: "1:1060482020142:web:5605da12e9f5bfa87780bf",
  measurementId: "G-HF03LPH5Q9"
};

!firebase.apps.length ? firebase.initializeApp(config) : "";

export const auth = firebase.auth();
export const google = new firebase.auth.GoogleAuthProvider()
export const db = firebase.firestore()
export const storage = firebase.storage()

