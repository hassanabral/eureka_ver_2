import React from 'react';
import { useSelector } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';
import Spinner from './Spinner';

const AuthIsLoaded = ({children}) => {
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) return <Spinner/>;
  return children
};

export default AuthIsLoaded;