import React, { Fragment, useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { Link as RouterLink, useParams } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';
import EditIcon from '@material-ui/icons/Edit';
import FeedCardButtons from '../feed/FeedCardButtons';
import {
  deletePost,
  savePost,
  toggleBookmark,
} from '../postActions';
import DeleteIcon from '@material-ui/icons/Delete';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useFirebase, useFirestore } from 'react-redux-firebase';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  hashtag: {
    padding: theme.spacing(0.5),
    borderRadius: theme.spacing(0.5)
  },
  deleteButton: {
    color: '#f44336',
    borderColor: '#f44336',
    '&:hover': {
      backgroundColor: '#ffebee'
    }
  }

}));

const PostDetailedBody = ({ theme, post, isAuthenticated, isAuthenticatedUser }) => {
  const classes = useStyles(theme);
  const firestore = useFirestore();
  const dispatch = useDispatch();

  const {id} = useParams();

  const [saved, setSaved] = useState();

  const firebase = useFirebase();

  useEffect(() => {
    dispatch(toggleBookmark(firestore, id, setSaved));
  }, [id]);

  const handleOnSave = () => {
    dispatch(savePost({ firebase, firestore }, id));
  }

  return (
    <Fragment>
      <Box mb={3}>
        <Typography variant='h3'>{post.title}</Typography>
      </Box>
      <Box mb={2}>
        <Grid container spacing={2}>
          <Grid item>
            <Link component={RouterLink} to={`/users/${post.authorId}`}>
              <Avatar alt={post.authorName}
                      src={post.authorPhotoURL}/>
            </Link>
          </Grid>
          <Box mt={2} ml={1} mr={0} component='span'>
            <Link variant='body1' color="secondary" component={RouterLink}
                  to={`/users/${post.authorId}`}>{post.authorName}</Link>
          </Box>
          <Box mt={2} mx={1} component='span'>
            <Typography display='inline' variant="body1" style={{ color: '#757575' }}>
              Written on {moment(post.date.toDate()).format('LL')}
            </Typography>
          </Box>
          {isAuthenticated &&
          <Box mt={2} mb={1} ml={2} component='span'>
            {isAuthenticatedUser ? (
              <ButtonGroup size='small' aria-label="button group">
                <Button color='primary'
                        component={RouterLink}
                        to={`/posts/edit/${id}`}
                        startIcon={<EditIcon/>}>
                  Edit
                </Button>
                <Button
                  onClick={() => deletePost(firestore, id)}
                  className={classes.deleteButton} startIcon={<DeleteIcon/>}>Delete</Button>
              </ButtonGroup>
            ) : (
              <Button
                onClick={handleOnSave}
                variant="outlined"
                color="primary"
                size='small'
                startIcon={<BookmarkIcon/>}
              >
                {!saved ? 'Save' : 'Unsave'}
              </Button>
            )
            }
          </Box>
          }
        </Grid>
      </Box>

      <Box mb={1}>
          {
            post.hashtags.map(hashtag =>
              <Box key={hashtag} mr={1} component='span'>
                <Typography display='inline' variant="body2" className={classes.hashtag}
                            style={{ backgroundColor: 'yellow' }}>
                  #{hashtag}
                </Typography>
              </Box>
            )
          }
      </Box>

      <Box mt={3} mb={2}>
          {ReactHtmlParser(post.body)}
      </Box>

      <FeedCardButtons likeCount={post.likeCount} commentCount={post.commentCount}
                       savedCount={post.savedCount} postId={id}/>
    </Fragment>
  );
};

export default PostDetailedBody;