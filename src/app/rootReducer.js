import { combineReducers } from '@reduxjs/toolkit';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import { reducer as FormReducer} from "redux-form";
import { reducer as ToastrReducer } from 'react-redux-toastr';

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  form: FormReducer,
  toastr: ToastrReducer
});

export default rootReducer;