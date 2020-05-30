import React, { useState } from 'react';
import {TextField} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const PostDetailedReplyForm = ({setToggleReplyForm}) => {

  return (
    <Box>
      <form>
        <TextField
          fullWidth
          placeholder='Add a reply...'
          multiline
          rows={2}
          rowsMax={6}
        />
        <Box display='flex' flexDirection='row-reverse' m={1}>
          <Button variant='contained' color='primary'>Reply</Button>
          <Box component='span' mr={1}>
            <Button color='secondary' onClick={() => setToggleReplyForm(false)}>Cancel</Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default PostDetailedReplyForm;