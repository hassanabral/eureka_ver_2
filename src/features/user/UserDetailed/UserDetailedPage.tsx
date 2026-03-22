import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import UserDetailedHeader from './UserDetailedHeader';
import UserDetailedPageBody from './UserDetailedPageBody';
import Loading from '../../../app/common/util/Loading';
import { useParams } from 'react-router-dom';
import { useFirestoreDoc } from '../../../app/hooks/useFirestoreDoc';
import { useFirestoreQuery } from '../../../app/hooks/useFirestoreQuery';

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

  const { data: user, loading: userLoading } = useFirestoreDoc('users', id);

  const { data: userPosts, loading: postsLoading } = useFirestoreQuery({
    collection: 'posts',
    where: [
      ['authorId', '==', id],
      ['status', '==', 'published'],
      ['deleted', '==', false]
    ],
    orderBy: ['date', 'desc']
  });

  const userFirstName = user?.displayName?.substr(0, user.displayName.indexOf(' '));

  return (
    <Fragment>
      <Grid container className={classes.root}>
        <Grid item lg={8} sm={12} className={classes.gridItem}>
          <Grid container className={classes.root}>
            <Grid item sm={12} className={classes.gridItem}>
              {user && <UserDetailedHeader user={user} userId={id}/>}
              <Loading loading={!user && userLoading}/>
            </Grid>
            <Grid item sm={12} className={classes.gridItem}>
              {userFirstName && <UserDetailedPageBody loading={!userPosts && postsLoading} posts={userPosts} sectionTitle={`${userFirstName}'s Posts`}/>}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>);

};

export default UserDetailedPage;
