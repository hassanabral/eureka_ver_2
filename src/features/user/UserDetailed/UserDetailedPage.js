import React, { Fragment, useMemo } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import UserDetailedHeader from './UserDetailedHeader';
import UserDetailedPageBody from './UserDetailedPageBody';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  }
}));

const UserDetailedPage = ({ theme, match: { params } }) => {

  const classes = useStyles(theme);

  const userProfileQuery = useMemo(() => ({
    collection: 'users',
    doc: params.id,
    storeAs: 'userProfile'
  }), [params.id]);

  const userPostQuery = useMemo(() => ({
    collection: 'posts',
    where: [['authorId', '==', params.id], ['status', '==', 'published']],
    orderBy: ['date', 'desc'],
    storeAs: 'userPosts'
  }), [params.id]);

  useFirestoreConnect(userProfileQuery);
  useFirestoreConnect(userPostQuery);

  const user = useSelector((state) => (state.firestore.data.userProfile));
  const userPosts = useSelector((state) => (state.firestore.ordered.userPosts));

  const userFirstName = user?.displayName?.substr(0, user.displayName.indexOf(' '));

  return (
    <Fragment>
      <Grid container className={classes.root}>
        <Grid item lg={8} sm={12}>
          <Grid container className={classes.root}>
            <Grid item sm={12}>
              {user && <UserDetailedHeader user={user} userId={params.id}/>}
            </Grid>
            <Grid item sm={12}>
              {userFirstName && userPosts && <UserDetailedPageBody posts={userPosts} sectionTitle={`${userFirstName}'s Posts`}/>}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>);

};

export default UserDetailedPage;
