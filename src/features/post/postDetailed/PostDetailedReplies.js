import React, { useEffect, useState, Fragment } from 'react';
import Box from '@material-ui/core/Box';
import { getReplies } from '../postActions';
import { useFirestore } from 'react-redux-firebase';
import PostDetailedComment from './PostDetailedComment';
import Loading from '../../../app/common/util/Loading';

const PostDetailedReplies = ({commentId, replies, setReplies}) => {
  const firestore = useFirestore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getReplies(firestore, commentId, setReplies, setLoading);
  }, [firestore, commentId, setReplies, setLoading])

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