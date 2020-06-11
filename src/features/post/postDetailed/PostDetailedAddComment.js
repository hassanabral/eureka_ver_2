import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { Field, reduxForm } from 'redux-form';
import { combineValidators, isRequired } from 'revalidate';
import RichEditor from '../../../app/common/form/RichEditor';
import { addComment, createPost } from '../postActions';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFirebase, useFirestore } from 'react-redux-firebase';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  }
}));

const validate = combineValidators({
  commentBody: isRequired('Comment body'),
});

const PostDetailedAddComment = ({ theme, postId, handleSubmit, invalid, submitting}) => {
  const dispatch = useDispatch();
  const firebase = useFirebase();
  const firestore = useFirestore();

  const handleAddComment = async formData => {
    await dispatch(addComment({firebase, firestore}, formData, postId));
  }

  const classes = useStyles(theme);
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