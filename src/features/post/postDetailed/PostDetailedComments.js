import React, {Fragment} from 'react';
import PostDetailedComment from './PostDetailedComment';
import { Typography } from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import Loading from '../../../app/common/util/Loading';

const PostDetailedComments = ({postId}) => {

  const postCommentsQuery = {
    collection: 'posts',
    doc: postId,
    subcollections: [{ collection: "comments" }],
    orderBy: ['date', 'desc'],
    storeAs: 'postComments'
  };

  useFirestoreConnect(postCommentsQuery);

  const postComments = useSelector((state) => state.firestore.ordered.postComments);

  return (
    <Fragment>
      <Box my={2} mx={1}>
        <Box mr={0.5} component='span'>
          <Typography variant='body2' component='span'>
            Sort by:
          </Typography>
        </Box>
        <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
          <Button style={{textTransform: 'capitalize'}}>Date</Button>
          <Button style={{textTransform: 'capitalize'}}>Likes</Button>
        </ButtonGroup>
      </Box>
      {
        postComments?.length > 0 && postComments.map(comment => <PostDetailedComment key={comment.id} comment={comment} showReplies={true}/>)
      }
      <Loading loading={!postComments}/>
    </Fragment>);
};

export default PostDetailedComments;