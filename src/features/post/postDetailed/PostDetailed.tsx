import React, { Fragment } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import PostDetailedSidebarRight from './PostDetailedSidebarRight';
import PostDetailedBody from './PostDetailedBody';
import PostDetailedAddComment from './PostDetailedAddComment';
import PostDetailedComments from './PostDetailedComments';
import { useSelector } from 'react-redux';
import Loading from '../../../app/common/util/Loading';
import { useParams } from 'react-router-dom';
import { useFirestoreDoc } from '../../../app/hooks/useFirestoreDoc';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    padding: theme.spacing(5),
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(3),
    }
  },
  gridItem: {
    width: '100%'
  }

}));

const PostDetailed = () => {
  const classes = useStyles();
  const { id } = useParams();

  const { data: post, loading } = useFirestoreDoc('posts', id);

  const auth = useSelector((state: any) => state.auth);
  const isAuthenticated = auth.isLoaded && auth.authenticated;
  const isAuthenticatedUser = post?.authorId === auth.currentUser?.uid;

  const mainDiv = <Fragment>
    <Grid container className={classes.root} spacing={3}>
      <Grid item lg={8} sm={12} className={classes.gridItem}>
        <Card className={classes.card}>
          {post && <PostDetailedBody
            post={post}
            isAuthenticatedUser={isAuthenticatedUser}
            isAuthenticated={isAuthenticated}/>}
          <Loading loading={!post && loading}/>
        </Card>
        {isAuthenticated && <Card className={classes.card}>
          <PostDetailedAddComment postId={id}/>
        </Card>}
        <PostDetailedComments isAuthenticated={isAuthenticated} postId={id}/>
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
