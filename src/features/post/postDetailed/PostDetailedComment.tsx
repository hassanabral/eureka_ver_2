import React, { Fragment, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PostDetailedReplyForm from './PostDetailedReplyForm';
import PostDetailedReplies from './PostDetailedReplies';
import { formatDistanceToNow } from 'date-fns';
import ReactHtmlParser from 'react-html-parser';
import {
  deleteComment,
  likeOrUnlikeComment,
  toggleLikeComment
} from '../postActions';
import { useDispatch, useSelector } from 'react-redux';
import { toastr } from 'react-redux-toastr';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    padding: theme.spacing(3, 5),
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(3),
    }
  },
  icon: {
    marginBottom: '-4px',
    marginRight: '4px'
  },
  button: {
    paddingBottom: 0,
    cursor: 'pointer'
  }
}));

const PostDetailedComment = ({ comment, commentOrReply = 'comment', showReplies = false }) => {

  const [toggleReplies, setToggleReplies] = useState(showReplies);
  const [toggleReplyForm, setToggleReplyForm] = useState(false);
  const [replies, setReplies] = useState(null);

  const [like, setLike] = useState();
  const [likeCountState, setLikeCountState] = useState(comment.likeCount);

  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);
  const isAuthenticated = auth.isLoaded && auth.authenticated;

  useEffect(() => {
    if(isAuthenticated) {
      dispatch(toggleLikeComment(comment.id, setLike));
    }
  }, [comment.id, isAuthenticated]);

  const handleOnLike = () => {
    if(isAuthenticated) {
      dispatch(likeOrUnlikeComment(comment.id));
      if (like) {
        setLikeCountState(likeCountState - 1);
      } else {
        setLikeCountState(likeCountState + 1);
      }
    } else {
      toastr.error('Oops', 'You need to login to like a comment');
    }

  };


  const isAuthenticatedUser = comment?.authorId === auth.currentUser?.uid;

  const isReply = commentOrReply === 'reply';

  const likeButtonColor = like ? 'red' : 'grey';

  const classes = useStyles();

  const body = (<Fragment>
    <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box mb={0} component='span'>
        <Chip
          avatar={<Avatar alt={comment.authorName}
                          src={comment.authorPhotoURL}/>}
          label={comment.authorName}
          clickable
          color="primary"
          component={RouterLink}
          to={`/users/${comment.authorId}`}
        />
        <Box ml={1} component='span'>
          <Typography variant="body2" style={{ color: '#757575' }} paragraph={true}
                      display='inline'>
            Posted {comment?.date && formatDistanceToNow(comment.date.toDate(), { addSuffix: true })}
          </Typography>
        </Box>

      </Box>
      {isAuthenticated && isAuthenticatedUser &&
      <Box component='span' mb={0} pb={0}>
        <IconButton
          onClick={() => deleteComment(comment.id)}
          className={classes.button}
          aria-label="delete"
          style={{ color: '#ba1818' }}
          size="large">
          <DeleteIcon fontSize="medium"/>
        </IconButton>
      </Box>
      }

    </Box>
    <Box>
      {ReactHtmlParser(comment.commentBody)}
    </Box>


    <Box mb={1}>
      <Box mb={0} mr={2} component='span'>
        <Typography {...{ mb: 0 } as any} variant="body2" display="inline" gutterBottom={true}>
          <Link onClick={handleOnLike} {...{ mb: 0 } as any} className={classes.button}
                style={{ color: `${likeButtonColor}` }}>
            <FavoriteIcon style={{ color: `${likeButtonColor}` }}
                          className={classes.icon} fontSize='small'/>
            {likeCountState}
          </Link>
        </Typography>
      </Box>
      {isAuthenticated && <Box component='span'>
        <Button
          onClick={() => setToggleReplyForm(!toggleReplyForm)}
          disableRipple={true}
          className={classes.button}
          color='secondary'
          size="medium">Reply</Button>
      </Box>}
    </Box>
    {toggleReplyForm && isAuthenticated &&
    <PostDetailedReplyForm setToggleReplyForm={setToggleReplyForm}
                           commentId={comment.id} setToggleReplies={setToggleReplies}/>}
    <Box mb={0}>
      {comment.commentCount > 0 &&
      <Button className={classes.button}
              onClick={() => setToggleReplies(!toggleReplies)}
              variant='text'
              color='primary'
              disableRipple={true}
              disableElevation={true}
              disableFocusRipple={true}
              startIcon={toggleReplies ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>}>
        {toggleReplies ? 'Hide' : 'View'} {comment.commentCount} replies
      </Button>
      }

    </Box>
    {toggleReplies && <PostDetailedReplies commentId={comment.id} replies={replies}
                                           setReplies={setReplies}/>}
  </Fragment>);

  return (
    <Fragment>
      <Box mb={2}>
        {!isReply ? (<Card className={classes.card}>
          {body}
        </Card>) : (<Box>
            {body}
          </Box>
        )}
      </Box>
    </Fragment>

  );
};

export default PostDetailedComment;
