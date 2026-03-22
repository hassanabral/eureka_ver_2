import React, { Fragment } from 'react';
import './App.css';
import { createTheme, ThemeProvider, Theme, StyledEngineProvider, adaptV4Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import { Route, Routes } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
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

import { blue, grey, red, green } from '@mui/material/colors';


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


const theme = createTheme(adaptV4Theme({
  palette: {
    primary: blue,
    secondary: grey,
  },
  colors: {
    red: red[500],
    grey,
    green
  }
} as any));

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(5),
  },
  mainContainer: {
    [theme.breakpoints.down('lg')]: {
      padding: 0
    }
  },
  input: {
    padding: theme.spacing(1, 0),
  },
  box: {
    padding: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
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

function AppLayout() {
  const classes = useStyles();
  return (
    <Fragment>
      <CssBaseline/>
      <ResponsiveDrawer/>
      <main className={classes.content}>
        <div className={classes.toolbar}/>
        <Container maxWidth={'lg'} className={classes.box}>
          <Routes>
            <Route path='/users/:id' element={<UserDetailedPage/>}/>
            <Route path='/users' element={<UsersPage/>}/>
            <Route path='/feed' element={<FeedsPage/>}/>
            <Route path='/edit-profile' element={<PrivateRoute><SettingsPage/></PrivateRoute>}/>
            <Route path='/posts/add' element={<PrivateRoute><AddPost/></PrivateRoute>}/>
            <Route path='/posts/:id' element={<PostDetailed/>}/>
            <Route path='/posts/edit/:id' element={<PrivateRoute><EditPostWrapper/></PrivateRoute>}/>
            <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
            <Route path='/bookmarks' element={<PrivateRoute><Bookmarks/></PrivateRoute>}/>
            <Route path='/tags' element={<TagsPage/>}/>
          </Routes>
        </Container>
      </main>
    </Fragment>
  );
}

function App() {
  const classes = useStyles();
  const auth = useSelector((state: any) => state.auth);
  if (!auth.isLoaded) return <Spinner />;

  return (
    <div className="App">
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <div className={classes.root}>
            <Routes>
              <Route path='/' element={<Landing/>}/>
              <Route path='/*' element={<AppLayout/>}/>
            </Routes>
          </div>
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
}

export default App;
