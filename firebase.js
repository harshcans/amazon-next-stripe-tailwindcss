import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJOqljitjp3Ni8SsM3A5JDxLaXGZnhKx0",
  authDomain: "amaaa2.firebaseapp.com",
  projectId: "amaaa2",
  storageBucket: "amaaa2.appspot.com",
  messagingSenderId: "605933469549",
  appId: "1:605933469549:web:ec7f76cc918733e4906464",
  measurementId: "G-KTCMF2MNCH",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export default db;
