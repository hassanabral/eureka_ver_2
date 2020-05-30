import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import NoteIcon from '@material-ui/icons/Note';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link'
import { Link as RouterLink, useHistory, withRouter } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import AddIcon from '@material-ui/icons/Add';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import { connect, useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { useFirebase } from 'react-redux-firebase';

const useStyles = makeStyles(theme => {
  const drawerWidth = 400;

  return {
    root: {
      display: 'flex',
    },
    outerDiv: {
      [theme.breakpoints.up('sm')]: {
        marginLeft: `10%`
      },
      [theme.breakpoints.up('md')]: {
        marginLeft: `calc(${drawerWidth}px - 50%)`
      },


    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: 240,
        flexShrink: 0,
      },
      [theme.breakpoints.up('md')]: {
        width: drawerWidth,
        flexShrink: 0,
      },

    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - 240px)`,
        marginLeft: 240,
      },
      [theme.breakpoints.up('md')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      }
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: 240,
      [theme.breakpoints.up('md')]: {
        width: drawerWidth,
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
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      marginRight: theme.spacing(30),
      paddingLeft: 0,
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        marginRight: theme.spacing(5),
      },
      [theme.breakpoints.up('sm')]: {
        width: 'auto',
        marginRight: theme.spacing(45),
      },
      [theme.breakpoints.up('md')]: {
        marginRight: theme.spacing(55),
      },
      [theme.breakpoints.up('lg')]: {
        marginRight: theme.spacing(72),
      },
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
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
}});

function ResponsiveDrawer({ ...props}) {

  const history = useHistory();
  const firebase = useFirebase();

  const handleLogout = () => {
    firebase.auth().signOut().then(() => {
      history.push('/');
    });

  };

  const auth = useSelector(state => state.firebase.auth, []);
  const isAuthenticated = auth.isLoaded && !auth.isEmpty;

  const { container } = props;
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const footer = (
    <Box mx={1} style={{
      position: 'absolute',
      bottom: '25px',
    }}>
      <Typography >Created with ❤️ by <Link href="https://github.com/hassanyakef" target='_blank'>Hassan Yakefujiang</Link></Typography>
    </Box>
  );

  const authenticatedMenu = (
    <div className={classes.outerDiv}>
      <div className={classes.toolbar} />
      <List>
        <ListItem button key={'Home'} component={RouterLink} to="/feed">
          <ListItemIcon>
            <HomeOutlinedIcon/>
          </ListItemIcon>
          <ListItemText primary={'Home'}/>
        </ListItem>
        <ListItem button key={'Dashboard'} component={RouterLink} to="/dashboard">
          <ListItemIcon>
            <DashboardOutlinedIcon/>
          </ListItemIcon>
          <ListItemText primary={'Dashboard'}/>
        </ListItem>
        <ListItem button key={'Tags'}  component={RouterLink} to="/tags">
          <ListItemIcon>
            <LabelOutlinedIcon/>
          </ListItemIcon>
          <ListItemText primary={'Tags'}/>
        </ListItem>
        <ListItem button key={'Users'} component={RouterLink} to="/users">
          <ListItemIcon>
            <PeopleOutlineIcon/>
          </ListItemIcon>
          <ListItemText primary={'Users'}/>
        </ListItem>
        <ListItem button key={'Bookmarks'}  component={RouterLink} to="/bookmarks">
          <ListItemIcon>
            <BookmarkBorderIcon/>
          </ListItemIcon>
          <ListItemText primary={'Bookmarks'}/>
        </ListItem>
        <ListItem button key={'Profile'} component={RouterLink} to={`/users/pDgyiwDU4TPLL0WWDkf9NI6BQ193`}>
          <ListItemIcon>
            <PersonOutlineIcon/>
          </ListItemIcon>
          <ListItemText primary={'Profile'}/>
        </ListItem>
        <ListItem button key={'Setting'} component={RouterLink} to="/edit-profile">
          <ListItemIcon>
            <SettingsOutlinedIcon/>
          </ListItemIcon>
          <ListItemText primary={'Setting'}/>
        </ListItem>
        <Box ml={1} mt={1} mb={2}>
          <Button
            component={RouterLink}
            to="/posts/add"
            variant="contained"
            color="primary"
            size='large'
            className={classes.addIdeaButton}
            startIcon={<AddIcon />}
          >
            Add Post
          </Button>
        </Box>
      </List>
      <Divider/>
      <List>
        <ListItem button key={'Logout'} onClick={handleLogout}>
          <ListItemIcon >
            <ExitToAppIcon/>
          </ListItemIcon>
          <ListItemText primary={'Logout'}/>
        </ListItem>
      </List>
      {footer}
    </div>
  );

  const unAuthenticatedMenu = (
    <div className={classes.outerDiv}>
      <div className={classes.toolbar} />
      <List>
        <ListItem button key={'Tags'}  component={RouterLink} to="/tags">
          <ListItemIcon>
            <LabelOutlinedIcon/>
          </ListItemIcon>
          <ListItemText primary={'Tags'}/>
        </ListItem>
      </List>
      {footer}
    </div>
  );

  return (
    <Fragment>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Link color='inherit' variant='h6' underline='none' component={RouterLink} to='/feed'>Eureka</Link>
          <Box className={classes.search}>
          </Box>

          {isAuthenticated && <div>
            <IconButton
              className={classes.menuItem}
              aria-label="Profile" color="inherit"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
            >
              {/*<Avatar className={classes.small} alt={user?.name} src={user?.avatar} />*/}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose} component={RouterLink} to="/dashboard">Dashboard</MenuItem>
              <MenuItem onClick={handleClose} component={RouterLink} to={`/users/1`}>Profile</MenuItem>
              <MenuItem onClick={handleClose} component={RouterLink} to={`/posts/add`}>Add Post</MenuItem>
            </Menu>
          </div>}


        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={ 'left'}
            open={mobileOpen}
            onClick={handleDrawerToggle}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {isAuthenticated ? authenticatedMenu : unAuthenticatedMenu}

          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {isAuthenticated ? authenticatedMenu : unAuthenticatedMenu}
          </Drawer>
        </Hidden>
      </nav>
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

export default withRouter(ResponsiveDrawer)
