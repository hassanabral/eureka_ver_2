import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/storage';

var firebaseConfig = {
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;