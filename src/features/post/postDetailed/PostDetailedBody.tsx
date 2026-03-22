import React, { Fragment, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link as RouterLink, useParams } from 'react-router-dom';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { format } from 'date-fns';
import ReactHtmlParser from 'react-html-parser';
import EditIcon from '@mui/icons-material/Edit';
import FeedCardButtons from '../feed/FeedCardButtons';
import {
  deletePost,
  savePost,
  toggleBookmark,
} from '../postActions';
import DeleteIcon from '@mui/icons-material/Delete';
import ButtonGroup from '@mui/material/ButtonGroup';
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

const PostDetailedBody = ({ post, isAuthenticated, isAuthenticatedUser }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {id} = useParams();

  const [saved, setSaved] = useState();

  useEffect(() => {
    if(isAuthenticated) {
      dispatch(toggleBookmark(id, setSaved));
    }
  }, [id, isAuthenticated]);

  const handleOnSave = () => {
    dispatch(savePost(id));
  }

  return (
    <Fragment>
      <Box mb={3}>
        <Typography variant='h4'>{post.title}</Typography>
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
              Written on {format(post.date.toDate(), 'MMMM d, yyyy')}
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
                  onClick={() => deletePost(id)}
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
