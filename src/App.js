import React, { Fragment } from 'react';
import './App.css';
import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import ResponsiveDrawer from './features/nav/ResponsiveDrawer';
import Landing from './features/layout/Landing';
import UserDetailedPage from './features/user/UserDetailed/UserDetailedPage';
import UsersPage from './features/user/UsersPage/UsersPage';
import AddPost from './features/post/postForm/AddPost';
import PostDetailed from './features/post/postDetailed/PostDetailed';
import Dashboard from './features/dashboard/Dashboard';
import Bookmarks from './features/post/bookmarks/Bookmarks';
import TagsPage from './features/post/tag/TagsPage';
import FeedsPage from './features/post/feed/FeedsPage';
import SettingsPage from './features/user/Settings/SettingsPage';
import PrivateRoute from './app/common/util/PrivateRoute';
import { useSelector } from 'react-redux';
import Spinner from './app/common/util/Spinner';
import EditPostWrapper from './features/post/postForm/EditPostWrapper';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: grey,
  },
  colors: {
    red: red[500],
    grey,
    green
  }
});

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(5),
  },
  mainContainer: {
    [theme.breakpoints.down('md')]: {
      padding: 0
    }
  },
  input: {
    padding: theme.spacing(1, 0),
  },
  box: {
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0.5),
    }
  },
  fab: {
    bottom: theme.spacing(10),
    right: theme.spacing(10),
    margin: 0,
    top: 'auto',
    left: 'auto',
    position: 'fixed',
  },
  appIcon: {
    padding: theme.spacing(2)
  },
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
  toolbar: theme.mixins.toolbar,
}));

function App () {
  const classes = useStyles();
  const auth = useSelector(state => state.firebase.auth, []);
  if (!auth.isLoaded && auth.isEmpty) return <Spinner />;

  return (
      <div className="App">
        <ThemeProvider theme={theme}>
          <div className={classes.root}>
          <Switch>
            <Route exact path='/' component={Landing}/>
          </Switch>
          <Route
            path='/(.+)'
            render={() => (
                <Fragment>
                  <CssBaseline/>
                  <ResponsiveDrawer/>
                  <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    <Container maxWidth={'lg'} className={classes.box}>
                      <Switch>
                        <Route exact path='/users/:id' component={UserDetailedPage}/>
                        <Route exact path='/users' component={UsersPage}/>
                        <PrivateRoute exact path = "/edit-profile">
                          <SettingsPage/>
                        </PrivateRoute>
                        {/*<Route exact path='/feed' component={FeedsPage}/>*/}
                        <PrivateRoute exact path="/feed">
                          <FeedsPage/>
                        </PrivateRoute>
                        <PrivateRoute exact path='/posts/add' >
                          <AddPost/>
                        </PrivateRoute>
                        <Route exact path='/posts/:id' component={PostDetailed}/>
                        <PrivateRoute exact path='/posts/edit/:id'>
                          <EditPostWrapper/>
                        </PrivateRoute>
                        <PrivateRoute exact path='/dashboard'>
                          <Dashboard/>
                        </PrivateRoute>
                        <PrivateRoute exact path='/bookmarks'>
                          <Bookmarks/>
                        </PrivateRoute>
                        <Route exact path='/tags' component={TagsPage}/>
                      </Switch>
                    </Container>
                  </main>
                </Fragment>
              )}
          />
          </div>
        </ThemeProvider>
      </div>
  );
}

export default App;
