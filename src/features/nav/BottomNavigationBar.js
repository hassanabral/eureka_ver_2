import React, { useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import EditIcon from '@material-ui/icons/Edit';
import MenuIcon from '@material-ui/icons/Menu';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useFirebase, useFirestore } from 'react-redux-firebase';
import { signInWithGoogle} from '../../app/common/util/helpers';

const useStyles = makeStyles({
  root: {
    width: '100vw',
    height: '8.5vh',
    position: 'fixed',
    bottom: 0,
    top: 'auto',
    zIndex: '1000',
    borderTop: '0.5px solid #ddd'
  },
});

const BottomNavigationBar = ({isAuthenticated, authUid, botNavValue = 0, setBotNavValue, setMobileOpen}) => {
  const classes = useStyles();
  let location = useLocation();
  const firebase = useFirebase();
  const firestore = useFirestore();

  const handleLogin = async () => {
    await signInWithGoogle(firebase, firestore);
  }

  useEffect(() => {
    if(isAuthenticated) {
      switch(location.pathname) {
        case '/feed':
          setBotNavValue(0);
          break;
        case '/posts/add':
          setBotNavValue(1);
          break;
        case '/dashboard':
          setBotNavValue(2);
          break;
        default:
          setBotNavValue(null);
          break;
      }
    } else {
      switch(location.pathname) {
        case '/feed':
          setBotNavValue(0);
          break;
        case '/users':
          setBotNavValue(1);
          break;
        default:
          setBotNavValue(null);
          break;
      }
    }

  }, [location.pathname, authUid, setBotNavValue, isAuthenticated]);

  const authMenu = (<BottomNavigation
    color='primary'
    value={botNavValue}
    onChange={(event, newValue) => {
      setBotNavValue(newValue);
    }}
    showLabels
    className={classes.root}
  >
    <BottomNavigationAction
      component={RouterLink}
      to='/feed'
      label="Home"
      icon={<HomeOutlinedIcon/>}
    />
    <BottomNavigationAction
      component={RouterLink}
      to='/posts/add'
      label="Post"
      icon={<EditIcon/>}
    />
    <BottomNavigationAction
      component={RouterLink}
      to='/dashboard'
      label="Dashboard"
      icon={<DashboardOutlinedIcon/>}
    />
    <BottomNavigationAction
      onClick={() => setMobileOpen(true)}
      label="Menu"
      icon={<MenuIcon/>}
    />
  </BottomNavigation>);

  const nonAuthMenu = (<BottomNavigation
    color='primary'
    value={botNavValue}
    onChange={(event, newValue) => {
      setBotNavValue(newValue);
    }}
    showLabels
    className={classes.root}
  >
    <BottomNavigationAction
      component={RouterLink}
      to='/feed'
      label="Home"
      icon={<HomeOutlinedIcon/>}
    />
    <BottomNavigationAction
      component={RouterLink}
      to='/users'
      label="Users"
      icon={<PeopleOutlineIcon/>}
    />
    <BottomNavigationAction
      onClick={() => handleLogin()}
      label="Login"
      icon={<ExitToAppIcon/>}
    />
    <BottomNavigationAction
      onClick={() => setMobileOpen(true)}
      label="Menu"
      icon={<MenuIcon/>}
    />
  </BottomNavigation>);

  return (
    <Fragment>
      {isAuthenticated ? authMenu : nonAuthMenu}
    </Fragment>
  );
};

export default BottomNavigationBar;