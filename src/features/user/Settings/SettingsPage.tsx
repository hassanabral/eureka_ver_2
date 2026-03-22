import React from 'react';
import { useSelector } from 'react-redux';
import EditProfile from './EditProfile';
import { useFirestoreDoc } from '../../../app/hooks/useFirestoreDoc';
import Loading from '../../../app/common/util/Loading';

const SettingsPage = () => {
  const uid = useSelector((state: any) => state.auth.currentUser?.uid);
  const { data: profile, loading } = useFirestoreDoc('users', uid);

  if (loading) return <Loading loading={true}/>;

  return (
     <EditProfile initialValues={profile}/>
  );
};

export default SettingsPage;
