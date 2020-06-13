import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import { getReplies } from '../postActions';
import { useFirestore } from 'react-redux-firebase';
import { useDispatch } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import PostDetailedComment from './PostDetailedComment';

const PostDetailedReplies = ({commentId, replies, setReplies}) => {
  const firestore = useFirestore();

  useEffect(() => {
    getReplies(firestore, commentId, setReplies);
  }, [commentId])

  return (
    <Box mt={2} ml={4}>
      {
        replies?.length > 0 && replies.map(reply => <PostDetailedComment key={reply.id} comment={reply} commentOrReply='reply'/>)
      }
    </Box>
  );
};

export default PostDetailedReplies;