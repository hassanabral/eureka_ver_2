import React from 'react';
import PostDetailedReply from './PostDetailedReply';
import Box from '@material-ui/core/Box';

const PostDetailedReplies = () => {
  return (
    <Box mt={2} ml={4}>
      <PostDetailedReply/>
      <PostDetailedReply/>
      <PostDetailedReply/>
    </Box>
  );
};

export default PostDetailedReplies;