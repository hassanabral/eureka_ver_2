import React, { useEffect, useState, Fragment } from 'react';
import Box from '@material-ui/core/Box';
import { getReplies } from '../postActions';
import PostDetailedComment from './PostDetailedComment';
import Loading from '../../../app/common/util/Loading';

const PostDetailedReplies = ({commentId, replies, setReplies}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getReplies(commentId, setReplies, setLoading);
  }, [commentId, setReplies, setLoading])

  return (
    <Fragment>
      <Loading loading={!replies && loading}/>
      <Box mt={2} ml={4}>
        {
          replies?.length > 0 && replies.map(reply => <PostDetailedComment key={reply.id} comment={reply} commentOrReply='reply'/>)
        }
      </Box>
    </Fragment>

  );
};

export default PostDetailedReplies;
