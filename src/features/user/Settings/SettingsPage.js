import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import EditProfile from './EditProfile';

const SettingsPage = () => {
  const profile = useSelector(state => state.firebase.profile);

  return (
     <EditProfile initialValues={profile}/>
  );
};

export default SettingsPage;