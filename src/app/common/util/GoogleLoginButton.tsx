import React, {Fragment} from 'react';
import { useNavigate } from 'react-router-dom';
import { isEmpty, isLoaded, useFirebase, useFirestore } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import {signInWithGoogle} from './helpers';

const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const firebase = useFirebase();
  const firestore = useFirestore();
  const auth = useSelector(state => state.firebase.auth);
  if (isLoaded(auth) && !isEmpty(auth)) {
    navigate('/feed');
  }

  const handleLogin = async () => {
    await signInWithGoogle(firebase, firestore);
  }

  return (
    <Fragment>
      <ListItem button key={'Login'} onClick={() => handleLogin()}>
        <ListItemIcon>
          <ExitToAppIcon/>
        </ListItemIcon>
        <ListItemText primary={'Login'}/>
      </ListItem>
    </Fragment>
  );
};

export default GoogleLoginButton;