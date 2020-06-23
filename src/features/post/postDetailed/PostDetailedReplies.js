import React, { useEffect, useState, Fragment } from 'react';
import Box from '@material-ui/core/Box';
import { getReplies } from '../postActions';
import { useFirestore } from 'react-redux-firebase';
import PostDetailedComment from './PostDetailedComment';
import Loading from '../../../app/common/util/Loading';

const PostDetailedReplies = ({commentId, replies, setReplies}) => {
  const firestore = useFirestore();

  useEffect(() => {
    getReplies(firestore, commentId, setReplies);
  }, [commentId])

  return (
    <Fragment>
      <Loading loading={!replies}/>
      <Box mt={2} ml={4}>
        {
          replies?.length > 0 && replies.map(reply => <PostDetailedComment key={reply.id} comment={reply} commentOrReply='reply'/>)
        }
      </Box>
    </Fragment>

  );
};

export default PostDetailedReplies;