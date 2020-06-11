import React, { useEffect, useState } from 'react';
import PostDetailedReply from './PostDetailedReply';
import Box from '@material-ui/core/Box';
import { getReplies } from '../postActions';
import { useFirestore } from 'react-redux-firebase';
import { useDispatch } from 'react-redux';

const PostDetailedReplies = ({commentId}) => {
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    const handleGetReplies = async () => {
      const repliesComponent = await dispatch(getReplies(firestore, commentId));
      console.log({repliesComponent});
    }
    handleGetReplies();
  }, [])


  return (
    <Box mt={2} ml={4}>
      {
        replies?.length > 0 && replies.map(reply => <PostDetailedReply reply={reply}/>)
      }
    </Box>
  );
};

export default PostDetailedReplies;