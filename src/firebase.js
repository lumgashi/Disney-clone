import { initializeApp } from 'firebase/app'
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore";
import { getDatabase } from "firebase/database";
import { getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  // apiKey: "AIzaSyAmKyJB7KDdGQrOVWd8tQUh5FZj7gM1J2Q",
  authDomain: "disneyplus-clone-80b26.firebaseapp.com",
  projectId: "disneyplus-clone-80b26",
  storageBucket: "disneyplus-clone-80b26.appspot.com",
  messagingSenderId: "58046118402",
  appId: "1:58046118402:web:c36e9f78858611488a851b",
  measurementId: "G-03JMFFH28X",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);
const auth = getAuth();
var provider = new firebase.auth.GoogleAuthProvider();
const storage = getStorage();


export { auth, provider, storage };
export default db;
