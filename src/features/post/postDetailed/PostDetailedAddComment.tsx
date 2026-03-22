import React, { Fragment } from 'react';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Field, reduxForm } from 'redux-form';
import { combineValidators, isRequired } from 'revalidate';
import RichEditor from '../../../app/common/form/RichEditor';
import { addComment } from '../postActions';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  }
}));

const validate = combineValidators({
  commentBody: isRequired('Comment body'),
});

const PostDetailedAddComment = ({ postId, handleSubmit, invalid, submitting }) => {
  const dispatch = useDispatch();

  const handleAddComment = async formData => {
    await dispatch(addComment(formData, postId));
  }

  const classes = useStyles();
  return (
      <Fragment>
        <form onSubmit={handleSubmit(handleAddComment)}>
          <Box mb={2}>
            <Typography variant='h4'>
              Comment
            </Typography>
          </Box>
          <Field
            name="commentBody"
            label="Add Comment"
            config={
              {
                placeholder:"Add a comment...",
              }
            }
            component={RichEditor}
          />
          <Box display='flex' flexDirection='row-reverse' mt={2}>
            <Button disabled={invalid || submitting} type='submit'  variant='contained' color='primary'>Submit</Button>
          </Box>
        </form>
      </Fragment>
  )
};

export default reduxForm({ form: 'addCommentForm', validate})(PostDetailedAddComment);
