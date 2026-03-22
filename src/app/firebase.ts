import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import 'firebase/compat/storage';
import keys from './config/keys';

// Initialize Firebase
const firebaseConfig = keys;

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
