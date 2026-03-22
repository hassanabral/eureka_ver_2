import React, { Fragment, useMemo } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import UserDetailedHeader from './UserDetailedHeader';
import UserDetailedPageBody from './UserDetailedPageBody';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import Loading from '../../../app/common/util/Loading';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  gridItem: {
    width: '100%'
  }
}));

const UserDetailedPage = () => {

  const { id } = useParams();
  const classes = useStyles();

  const userProfileQuery = useMemo(() => ({
    collection: 'users',
    doc: id,
    storeAs: 'userProfile'
  }), [id]);

  const userPostQuery = useMemo(() => ({
    collection: 'posts',
    where: [['authorId', '==', id], ['status', '==', 'published'],
      ['deleted', '==', false]],
    orderBy: ['date', 'desc'],
    storeAs: 'userPosts'
  }), [id]);

  useFirestoreConnect(userProfileQuery);
  useFirestoreConnect(userPostQuery);

  const user = useSelector((state) => (state.firestore.data.userProfile));
  const userPosts = useSelector((state) => (state.firestore.ordered.userPosts));

  const userFirstName = user?.displayName?.substr(0, user.displayName.indexOf(' '));

  return (
    <Fragment>
      <Grid container className={classes.root}>
        <Grid item lg={8} sm={12} className={classes.gridItem}>
          <Grid container className={classes.root}>
            <Grid item sm={12} className={classes.gridItem}>
              {user && <UserDetailedHeader user={user} userId={id}/>}
              <Loading loading={!user}/>
            </Grid>
            <Grid item sm={12} className={classes.gridItem}>
              {userFirstName && <UserDetailedPageBody loading={!userPosts} posts={userPosts} sectionTitle={`${userFirstName}'s Posts`}/>}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>);

};

export default UserDetailedPage;
