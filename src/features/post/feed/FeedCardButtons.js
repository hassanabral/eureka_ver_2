import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import { Box } from '@material-ui/core';
import { likeOrUnlike, toggleLike } from '../postActions';
import { useDispatch } from 'react-redux';
import { useFirebase, useFirestore } from 'react-redux-firebase';


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
  const buttonColor = like ? 'primary' : 'secondary';
  const iconColor = like ? 'primary' : 'action';

  const dispatch = useDispatch();
  const firebase = useFirebase();
  const firestore = useFirestore();

  useEffect(() => {
    dispatch(toggleLike(firestore, postId, setLike));
  }, [postId])

  return (
    <Box mb={1} mt={1.5}>
      <Box mr={2.5} component={'span'}>
        <Typography variant="body2" display="inline" gutterBottom={true}>
          <Link onClick={() => dispatch(likeOrUnlike({ firebase, firestore }, postId))}
                className={classes.button} color={buttonColor}>
            <ThumbUpOutlinedIcon color={iconColor} className={classes.icon}
                                 fontSize='small'/>
            {likeCount}
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
