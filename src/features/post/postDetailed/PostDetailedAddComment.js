import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { Field, reduxForm } from 'redux-form';
import { combineValidators, isRequired } from 'revalidate';
import TextArea from '../../../app/common/form/TextArea';

import { TextField } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  }
}));

const validate = combineValidators({
  commentBody: isRequired('Comment body'),
});

const PostDetailedAddComment = ({ theme}) => {
  const classes = useStyles(theme);
  return (
      <Fragment>
        <form>
          <Typography variant='h4'>
            Comment
          </Typography>
          {/*<Field*/}
          {/*  required*/}
          {/*  name="commentBody"*/}
          {/*  label="Add Comment"*/}
          {/*  multiline={true}*/}
          {/*  fullWidth={true}*/}
          {/*  rows="3"*/}
          {/*  component={TextArea}*/}
          {/*/>*/}
          <TextField
            fullWidth
            placeholder='Add a comment...'
            multiline
            rows={3}
            rowsMax={6}
          />
          <Box display='flex' flexDirection='row-reverse' mt={2}>
            <Button variant='contained' color='primary'>Submit</Button>
          </Box>
        </form>
      </Fragment>
  )
};

export default PostDetailedAddComment;