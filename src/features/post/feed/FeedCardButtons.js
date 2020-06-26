import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import { Box } from '@material-ui/core';
import { likeOrUnlike, toggleLike } from '../postActions';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty, isLoaded, useFirebase, useFirestore } from 'react-redux-firebase';
import { toastr } from 'react-redux-toastr';


const useStyles = makeStyles(theme => ({
  icon: {
    marginBottom: '-4px',
    marginRight: '4px'
  },
  button: {
    cursor: 'pointer'
  }
}));

const FeedCardButtons = ({ theme, likeCount, commentCount, savedCount, postId }) => {
  const classes = useStyles(theme);

  const [like, setLike] = useState();
  const [likeCountState, setLikeCountState] = useState(likeCount);
  const likeButtonColor = like ? 'primary' : 'secondary';
  const likeIconColor = like ? 'primary' : 'action';

  const dispatch = useDispatch();
  const firebase = useFirebase();
  const firestore = useFirestore();

  const auth = useSelector(state => state.firebase.auth);
  const isAuthenticated = isLoaded(auth) && !isEmpty(auth);

  useEffect(() => {
    if(isAuthenticated) {
      dispatch(toggleLike(firestore, postId, setLike));
    }
  }, [postId, isAuthenticated]);

  const handleOnLike = () => {
    if(isAuthenticated) {
      dispatch(likeOrUnlike({ firebase, firestore }, postId));
      if(like) {
        setLikeCountState(likeCountState - 1);
      } else {
        setLikeCountState(likeCountState + 1);
      }
    } else {
      toastr.error('Oops', 'You need to login to like a post');
    }

  }

  return (
    <Box mb={1} mt={1.5}>
      <Box mr={2.5} component={'span'}>
        <Typography variant="body2" display="inline" gutterBottom={true}>
          <Link onClick={handleOnLike}
                className={classes.button} color={likeButtonColor}>
            <ThumbUpOutlinedIcon color={likeIconColor} className={classes.icon}
                                 fontSize='small'/>
            {likeCountState}
          </Link>
        </Typography>
      </Box>
      <Box mr={2.5} component={'span'}>
        <Typography variant="body2" display="inline" gutterBottom={true}>
          <Link component={RouterLink} to={`/posts/${postId}`} color="secondary">
            <ChatBubbleOutlineIcon color="action" className={classes.icon}
                                   fontSize='small'/>
            {commentCount}
          </Link>
        </Typography>
      </Box>
    </Box>

  );
};

export default FeedCardButtons;
