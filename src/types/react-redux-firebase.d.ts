declare module 'react-redux-firebase' {
  import { ComponentType } from 'react';
  import { Reducer } from 'redux';

  export function isLoaded(...args: any[]): boolean;
  export function isEmpty(...args: any[]): boolean;
  export function useFirebase(): any;
  export function useFirestore(): any;
  export function useFirestoreConnect(queries: any): void;

  export const firebaseReducer: Reducer;

  export const ReactReduxFirebaseProvider: ComponentType<{
    firebase: any;
    config: any;
    dispatch: any;
    createFirestoreInstance: any;
  }>;
}
