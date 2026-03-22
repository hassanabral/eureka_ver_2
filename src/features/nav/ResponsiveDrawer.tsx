import React, { Fragment, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import makeStyles from '@mui/styles/makeStyles';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import {
  Link as RouterLink,
  useNavigate,
  useLocation
} from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import Typography from '@mui/material/Typography';
import { auth as firebaseAuth } from '../../app/firebase';
import useMediaQuery from '@mui/material/useMediaQuery';
import BottomNavigationBar from './BottomNavigationBar';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleLoginButton from '../../app/common/util/GoogleLoginButton';
import { showSuccess } from '../../app/snackbar';

const useStyles = makeStyles(theme => {
  const drawerMarginLeftLg = 100;
  const drawerMarginLeftMd = 50;
  const drawerMarginLeftSm = 25;

  const menuBarWidthLg = 250;
  const menuBarWidthSm = 200;
  const menuBarWidthXs = 230;

  return {
    root: {
      display: 'flex',
    },
    outerDiv: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        marginLeft: drawerMarginLeftSm + menuBarWidthSm,
        flexShrink: 0,
      },
      [theme.breakpoints.up('md')]: {
        marginLeft: drawerMarginLeftMd + menuBarWidthSm,
        flexShrink: 0,
      },
      [theme.breakpoints.up('lg')]: {
        marginLeft: drawerMarginLeftLg + menuBarWidthLg,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerMarginLeftSm + menuBarWidthSm}px)`,
        marginLeft: drawerMarginLeftSm + menuBarWidthSm,
      },
      [theme.breakpoints.up('md')]: {
        width: `calc(100% - ${drawerMarginLeftMd + menuBarWidthSm}px)`,
        marginLeft: drawerMarginLeftMd + menuBarWidthSm,
      },
      [theme.breakpoints.up('lg')]: {
        width: `calc(100% - ${drawerMarginLeftLg + menuBarWidthLg}px)`,
        marginLeft: drawerMarginLeftLg + menuBarWidthLg,
      },

    },
    toolbarTop: {
      justifyContent: 'space-between',
      [theme.breakpoints.up('lg')]: {
        maxWidth: 725,
      },
      [theme.breakpoints.up('xl')]: {
        maxWidth: 1000,
      }
    },
    appBarBottom: {
      top: 'auto',
      bottom: 0,
    },
    grow: {
      flexGrow: 1,
    },
    fabButton: {
      position: 'absolute',
      zIndex: 1,
      top: -30,
      left: 0,
      right: 0,
      margin: '0 auto',
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      [theme.breakpoints.up('sm')]: {
        paddingLeft: drawerMarginLeftSm,
      },
      [theme.breakpoints.up('md')]: {
        paddingLeft: drawerMarginLeftMd,
      },
      [theme.breakpoints.up('lg')]: {
        paddingLeft: drawerMarginLeftLg,
      },
    },
    menuBar: {
      width: menuBarWidthXs,
      [theme.breakpoints.up('sm')]: {
        width: menuBarWidthSm,
      },
      [theme.breakpoints.up('lg')]: {
        width: menuBarWidthLg
      },

    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    addIdeaButton: {
      borderRadius: '25px / 25px ',
      paddingRight: theme.spacing(5),
      paddingLeft: theme.spacing(4),
      textTransform: 'capitalize'
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 120,
        '&:focus': {
          width: 200,
        },
      },
    },
    small: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
    menuItem: {
      marginLeft: theme.spacing(1),
      textTransform: 'capitalize',
      fontSize: '1rem'
    },
    mainButton: {
      textTransform: 'none',
      fontWeight: 'normal',
      fontSize: '1.35em',
    },
  };
});

function usePrevious (value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function ResponsiveDrawer ({ ...props }) {

  const navigate = useNavigate();
  const { pathname: currentLocation } = useLocation();

  const handleLogout = () => {
    firebaseAuth.signOut().then(() => {
      navigate('/');
    });
    showSuccess('You are logged out.');
  };

  const isMobileScreen = useMediaQuery('(max-width:600px)');

  const auth = useSelector((state: any) => state.auth);
  const isAuthenticated = auth.isLoaded && auth.authenticated;

  const { container } = props;
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [botNavValue, setBotNavValue] = React.useState(0);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const prevBotNavValue = usePrevious(botNavValue);

  const getCurrentLocationName = (currentLocationPath) => {
    if (currentLocationPath) {
      if (new RegExp('^/users/').test(currentLocation)) {
        return null;
      }
    }
    switch (currentLocationPath) {
      case '/feed':
        return 'Home';
      case '/bookmarks':
        return 'Bookmarks';
      case '/tags':
        return 'Tags';
      case '/dashboard':
        return 'Dashboard';
      case '/users':
        return 'Users';
      case '/posts/add':
        return 'Add Post';
      case '/edit-profile':
        return 'Setting';
      default:
        return null;
    }
  };

  const [currentLocationName, setCurrentLocationName] = useState<string | null>();

  useEffect(() => {
    setCurrentLocationName(getCurrentLocationName(currentLocation));
  }, [currentLocation, setCurrentLocationName, getCurrentLocationName]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
    if (mobileOpen) {
      setBotNavValue(prevBotNavValue);
    }
  };

  const footer = (
    <Box mx={1} style={{
      position: 'absolute',
      bottom: '25px',
    }}>
      <Typography>Created with <span role='img' aria-label='love emoji'>❤️</span> by <Link href="https://github.com/hassanyakef"
                                           target='_blank'>Hassan
        Yakefujiang</Link></Typography>
    </Box>
  );

  const authenticatedMenu = (
    <div className={classes.outerDiv}>
      <div>
        <div className={classes.toolbar}/>
        <List className={classes.menuBar}>
          <ListItem selected={currentLocation === '/feed'}
                    onClick={() => setBotNavValue(0)} button key={'Home'}
                    component={RouterLink} to="/feed">
            <ListItemIcon>
              <HomeOutlinedIcon/>
            </ListItemIcon>
            <ListItemText primary={'Home'}/>
          </ListItem>
          <ListItem selected={currentLocation === '/dashboard'}
                    onClick={() => setBotNavValue(2)} button key={'Dashboard'}
                    component={RouterLink} to="/dashboard">
            <ListItemIcon>
              <DashboardOutlinedIcon/>
            </ListItemIcon>
            <ListItemText primary={'Dashboard'}/>
          </ListItem>
          <ListItem selected={currentLocation === '/tags'} button key={'Tags'}
                    component={RouterLink} to="/tags">
            <ListItemIcon>
              <LabelOutlinedIcon/>
            </ListItemIcon>
            <ListItemText primary={'Tags'}/>
          </ListItem>
          <ListItem selected={currentLocation === '/users'} button key={'Users'}
                    component={RouterLink} to="/users">
            <ListItemIcon>
              <PeopleOutlineIcon/>
            </ListItemIcon>
            <ListItemText primary={'Users'}/>
          </ListItem>
          <ListItem selected={currentLocation === '/bookmarks'} button key={'Bookmarks'}
                    component={RouterLink} to="/bookmarks">
            <ListItemIcon>
              <BookmarkBorderIcon/>
            </ListItemIcon>
            <ListItemText primary={'Bookmarks'}/>
          </ListItem>
          <ListItem selected={new RegExp('^/users/').test(currentLocation)} button
                    key={'Profile'} component={RouterLink} to={`/users/${auth.currentUser?.uid}`}>
            <ListItemIcon>
              <PersonOutlineIcon/>
            </ListItemIcon>
            <ListItemText primary={'Profile'}/>
          </ListItem>
          <ListItem selected={currentLocation === '/edit-profile'} button key={'Setting'}
                    component={RouterLink} to="/edit-profile">
            <ListItemIcon>
              <SettingsOutlinedIcon/>
            </ListItemIcon>
            <ListItemText primary={'Setting'}/>
          </ListItem>
          <Box ml={1} mt={1} mb={2}>
            <Button
              onClick={() => setBotNavValue(1)}
              component={RouterLink}
              to="/posts/add"
              variant="contained"
              color="primary"
              size='large'
              className={classes.addIdeaButton}
              startIcon={<AddIcon/>}
            >
              Add Post
            </Button>
          </Box>
        </List>
        <Divider/>
        <List>
          <ListItem button key={'Logout'} onClick={handleLogout}>
            <ListItemIcon>
              <ExitToAppIcon/>
            </ListItemIcon>
            <ListItemText primary={'Logout'}/>
          </ListItem>
        </List>
        {footer}
      </div>
    </div>
  );

  const unAuthenticatedMenu = (
    <div className={classes.outerDiv}>
      <div>
        <div className={classes.toolbar}/>
        <List className={classes.menuBar}>
          <ListItem selected={currentLocation === '/feed'}
                    onClick={() => setBotNavValue(0)} button key={'Home'}
                    component={RouterLink} to="/feed">
            <ListItemIcon>
              <HomeOutlinedIcon/>
            </ListItemIcon>
            <ListItemText primary={'Home'}/>
          </ListItem>
          <ListItem selected={currentLocation === '/tags'} button key={'Tags'}
                    component={RouterLink} to="/tags">
            <ListItemIcon>
              <LabelOutlinedIcon/>
            </ListItemIcon>
            <ListItemText primary={'Tags'}/>
          </ListItem>
          <ListItem selected={currentLocation === '/users'} button key={'Users'}
                    component={RouterLink} to="/users">
            <ListItemIcon>
              <PeopleOutlineIcon/>
            </ListItemIcon>
            <ListItemText primary={'Users'}/>
          </ListItem>
        </List>
        <Divider/>
        <List>
          <GoogleLoginButton/>
        </List>
        {footer}
      </div>
    </div>
  );

  return (
    <Fragment>
      <AppBar position="fixed" className={classes.appBar}>
        <Box style={{}}>
          <Toolbar className={classes.toolbarTop}>
            {!isMobileScreen && <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
              size="large">
              <MenuIcon/>
            </IconButton>}
            {
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <IconButton
                  size="medium"
                  style={{ color: '#fff', }}
                  onClick={() => navigate(-1)}
                >
                  <ArrowBackIosIcon style={{ marginLeft: '7px' }}
                  />
                </IconButton>
                {!isMobileScreen && <Box ml={1}>
                  <Typography component='span'
                              variant='h5'
                  >
                    {currentLocationName}
                  </Typography>
                </Box>}
              </div>

            }
            {isMobileScreen &&
            <Typography
              variant='h5'
            >
              {currentLocationName}
            </Typography>
            }

            {!isAuthenticated && <div>
              <Button
                variant="text"
                style={{ color: '#fff' }}
                size='large'
                {...{ component: Link, target: "_blank", href: 'https://github.com/hassanyakef/eureka_ver_2' } as any}
                startIcon={<GitHubIcon/>}
              >
                Github
              </Button>
            </div>}
            {isAuthenticated && <div>
              <IconButton
                className={classes.menuItem}
                aria-label="Profile"
                color="inherit"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                component={RouterLink}
                to={`/users/${auth.currentUser?.uid}`}
                size="large">
                <Avatar className={classes.small} alt={auth.currentUser?.displayName}
                        src={auth.currentUser?.photoURL}/>
              </IconButton>
            </div>}
          </Toolbar>
        </Box>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          <Drawer
            container={container}
            variant="temporary"
            anchor={'left'}
            open={mobileOpen}
            onClick={handleDrawerToggle}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {isAuthenticated ? authenticatedMenu : unAuthenticatedMenu}
          </Drawer>
        </Box>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {isAuthenticated ? authenticatedMenu : unAuthenticatedMenu}
          </Drawer>
        </Box>
      </nav>
      {isMobileScreen &&
      <BottomNavigationBar isAuthenticated={isAuthenticated} botNavValue={botNavValue}
                           setBotNavValue={setBotNavValue}
                           authUid={auth.currentUser?.uid} setMobileOpen={setMobileOpen}/>}
    </Fragment>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element),
};

export default ResponsiveDrawer;
