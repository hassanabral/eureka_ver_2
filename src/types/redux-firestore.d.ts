declare module 'redux-firestore' {
  import { Reducer } from 'redux';

  export const firestoreReducer: Reducer;
  export function createFirestoreInstance(...args: any[]): any;
}
