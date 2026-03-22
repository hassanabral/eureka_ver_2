import React from 'react';
import { useSelector } from 'react-redux';
import Spinner from './Spinner';

const AuthIsLoaded = ({children}) => {
  const auth = useSelector((state: any) => state.auth);
  if (!auth.isLoaded) return <Spinner/>;
  return children
};

export default AuthIsLoaded;
