import React, {Fragment} from 'react';
import PostDetailedComment from './PostDetailedComment';
import { Typography } from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const PostDetailedComments = ({...props}) => {
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
      <PostDetailedComment/>
      <PostDetailedComment/>
      <PostDetailedComment/>
    </Fragment>);
};

export default PostDetailedComments;