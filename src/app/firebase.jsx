import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/storage';
import keys from './config/keys';

// Initialize Firebase
const firebaseConfig = keys;

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;