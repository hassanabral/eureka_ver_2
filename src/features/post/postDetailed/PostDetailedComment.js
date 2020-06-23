import React, { Fragment, useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import { Link } from '@material-ui/core';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import PostDetailedReplyForm from './PostDetailedReplyForm';
import PostDetailedReplies from './PostDetailedReplies';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';
import {
  deleteComment,
  likeOrUnlikeComment,
  toggleLikeComment
} from '../postActions';
import { isEmpty, isLoaded, useFirebase, useFirestore } from 'react-redux-firebase';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    padding: theme.spacing(3, 5),
    [theme.breakpoints.down('sm')]: {
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

const PostDetailedComment = ({ theme, comment, commentOrReply = 'comment', showReplies = false }) => {

  const [toggleReplies, setToggleReplies] = useState(showReplies);
  const [toggleReplyForm, setToggleReplyForm] = useState(false);
  const [replies, setReplies] = useState(null);
  const firestore = useFirestore();

  // new - start
  const [like, setLike] = useState();
  const [likeCountState, setLikeCountState] = useState(comment.likeCount);

  const dispatch = useDispatch();
  const firebase = useFirebase();

  useEffect(() => {
    dispatch(toggleLikeComment(firestore, comment.id, setLike));
  }, [comment.id]);

  const handleOnLike = () => {
    dispatch(likeOrUnlikeComment({ firebase, firestore }, comment.id));
    if (like) {
      setLikeCountState(likeCountState - 1);
    } else {
      setLikeCountState(likeCountState + 1);
    }
  };
  // new - end

  const auth = useSelector(state => state.firebase.auth);
  const isAuthenticated = isLoaded(auth) && !isEmpty(auth);
  const isAuthenticatedUser = comment?.authorId === auth?.uid;

  const isReply = commentOrReply === 'reply';

  const likeButtonColor = like ? 'red' : 'grey';

  const classes = useStyles(theme);

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
            Posted {comment?.date && moment(comment.date.toDate()).fromNow()}
          </Typography>
        </Box>

      </Box>
      {isAuthenticated && isAuthenticatedUser &&
      <Box component='span' mb={0} pb={0}>
        <IconButton onClick={() => deleteComment(firestore, comment.id)}
                    className={classes.button} aria-label="delete"
                    style={{ color: '#ba1818' }}>
          <DeleteIcon fontSize="default"/>
        </IconButton>
      </Box>
      }

    </Box>
    <Box>
      {ReactHtmlParser(comment.commentBody)}
    </Box>


    <Box mb={1}>
      <Box mb={0} mr={2} component='span'>
        <Typography mb={0} variant="body2" display="inline" gutterBottom={true}>
          <Link onClick={handleOnLike} mb={0} className={classes.button}
                style={{ color: `${likeButtonColor}` }}>
            <FavoriteIcon style={{ color: `${likeButtonColor}` }}
                          className={classes.icon} fontSize='small'/>
            {likeCountState}
          </Link>
        </Typography>
      </Box>
      <Box component='span'>
        <Button
          onClick={() => setToggleReplyForm(!toggleReplyForm)}
          disableRipple={true}
          className={classes.button}
          color='secondary'
          size="medium">Reply</Button>
      </Box>
    </Box>
    {toggleReplyForm &&
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
