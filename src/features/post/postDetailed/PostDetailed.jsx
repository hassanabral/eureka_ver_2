import React, { Fragment, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import PostDetailedSidebarRight from './PostDetailedSidebarRight';
import PostDetailedBody from './PostDetailedBody';
import PostDetailedAddComment from './PostDetailedAddComment';
import PostDetailedComments from './PostDetailedComments';
import { isEmpty, isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import Loading from '../../../app/common/util/Loading';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    padding: theme.spacing(5),
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3),
    }
  },
  gridItem: {
    width: '100%'
  }

}));

const PostDetailed = ({ theme, match: { params } }) => {
  const classes = useStyles(theme);

  const postQuery = useMemo(() => ({
    collection: 'posts',
    doc: params.id,
    storeAs: 'postDetailed'
  }), [params.id]);

  useFirestoreConnect(postQuery);

  const post = useSelector((state) => (state.firestore.data.postDetailed));
  const auth = useSelector(state => state.firebase.auth);
  const isAuthenticated = isLoaded(auth) && !isEmpty(auth);
  const isAuthenticatedUser = post?.authorId === auth?.uid;

  const mainDiv = <Fragment>
    <Grid container className={classes.root} spacing={3}>
      <Grid item lg={8} sm={12} className={classes.gridItem}>
        <Card className={classes.card}>
          {post && <PostDetailedBody
            post={post}
            isAuthenticatedUser={isAuthenticatedUser}
            isAuthenticated={isAuthenticated}/>}
          <Loading loading={!post}/>
        </Card>
        {isAuthenticated && <Card className={classes.card}>
          <PostDetailedAddComment postId={params.id}/>
        </Card>}
        <PostDetailedComments isAuthenticated={isAuthenticated} postId={params.id}/>
      </Grid>
      <Grid item lg={4} sm={12} className={classes.gridItem}>
        <Card className={classes.card}>
          {post && <PostDetailedSidebarRight authorId={post.authorId}/>}
          {/*<Loading loading={!post}/>*/}
        </Card>
      </Grid>
    </Grid>
  </Fragment>;

  return mainDiv;
};
export default PostDetailed;
