import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { Box } from '@mui/material';
import { likeOrUnlike, toggleLike } from '../postActions';
import { useDispatch, useSelector } from 'react-redux';
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

const FeedCardButtons = ({ likeCount, commentCount, savedCount, postId }) => {
  const classes = useStyles();

  const [like, setLike] = useState();
  const [likeCountState, setLikeCountState] = useState(likeCount);
  const likeButtonColor = like ? 'primary' : 'secondary';
  const likeIconColor = like ? 'primary' : 'action';

  const dispatch = useDispatch();

  const auth = useSelector((state: any) => state.auth);
  const isAuthenticated = auth.isLoaded && auth.authenticated;

  useEffect(() => {
    if(isAuthenticated) {
      dispatch(toggleLike(postId, setLike));
    }
  }, [postId, isAuthenticated]);

  const handleOnLike = () => {
    if(isAuthenticated) {
      dispatch(likeOrUnlike(postId));
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
