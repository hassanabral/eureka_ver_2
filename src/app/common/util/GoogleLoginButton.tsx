import React, {Fragment} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import {signInWithGoogle} from './helpers';

const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const auth = useSelector((state: any) => state.auth);
  if (auth.isLoaded && auth.authenticated) {
    navigate('/feed');
  }

  const handleLogin = async () => {
    await signInWithGoogle();
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
