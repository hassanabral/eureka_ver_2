import React, { Fragment, useEffect, useState } from 'react';
import PostDetailedComment from './PostDetailedComment';
import { Typography } from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import Loading from '../../../app/common/util/Loading';

const PostDetailedComments = ({ postId, isAuthenticated }) => {

  const postCommentsQuery = {
    collection: 'posts',
    doc: postId,
    subcollections: [{ collection: 'comments' }],
    orderBy: ['date', 'desc'],
    storeAs: 'postComments'
  };

  useFirestoreConnect(postCommentsQuery);

  const [comments, setComments] = useState(null);
  const [sortByToggle, setSortByToggle] = useState('date');

  const postComments = useSelector((state) => state.firestore.ordered.postComments);

  useEffect(() => {
    if (postComments) {
      setComments(postComments);
    }
  }, [postComments, setComments]);

  const sortBy = (type) => {
    let tempArr = [...comments];

    tempArr.sort((a, b) => {

      const commentA = type === 'likeCount' ? a.likeCount : a.date;
      const commentB = type === 'likeCount' ? b.likeCount : b.date;

      let comparison = 0;
      if (commentA < commentB) {
        comparison = 1;
      } else if (commentA > commentB) {
        comparison = -1;
      }
      return comparison;
    });
    setComments(tempArr);
  };

  return (
    <Fragment> {
      comments?.length > 0 && <Box my={2} mx={1}>
        {!isAuthenticated && <Box mb={1}>
          <Typography variant='h5'>
            Comments
          </Typography>
        </Box>}
        <Box mr={1} component='span'>
          <Typography variant='body2' component='span'>
            Sort by:
          </Typography>
        </Box>
        <ButtonGroup variant="text" color='primary'>
          <Button color={sortByToggle === 'date' ? 'primary' : 'secondary'}
                  onClick={() => {
                    sortBy('date');
                    setSortByToggle('date');
                  }} style={{ textTransform: 'capitalize' }}>Date</Button>
          <Button color={sortByToggle === 'likeCount' ? 'primary' : 'secondary'}
                  onClick={() => {
                    sortBy('likeCount');
                    setSortByToggle('likeCount');
                  }} style={{ textTransform: 'capitalize' }}>Likes</Button>
        </ButtonGroup>
      </Box>
    }
      {
        comments?.length > 0 && comments.map(
          comment => <PostDetailedComment key={comment.id} comment={comment}
                                          showReplies={true}/>)
      }
      <Loading loading={!postComments}/>
    </Fragment>);
};

export default PostDetailedComments;