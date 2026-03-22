import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Field, reduxForm } from 'redux-form';
import { combineValidators, isRequired } from 'revalidate';
import { useDispatch } from 'react-redux';
import { addReply } from '../postActions';
import TextArea from '../../../app/common/form/TextArea';

const validate = combineValidators({
  commentBody: isRequired('Reply body'),
});

const PostDetailedReplyForm = ({ setToggleReplyForm, commentId, handleSubmit, invalid, submitting, setToggleReplies }) => {

  const dispatch = useDispatch();

  const handleAddReply = async formData => {
    await dispatch(addReply(
      { ...formData, commentBody: `<p>${formData.commentBody}</p>` },
      commentId, setToggleReplies));
    setToggleReplyForm(false);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(handleAddReply)}>
        <Field
          required
          name="commentBody"
          label="Add a reply..."
          multiline={true}
          fullWidth={true}
          rows="3"
          component={TextArea}
        />
        <Box display='flex' flexDirection='row-reverse' m={1}>
          <Button disabled={invalid || submitting} type='submit' variant='contained'
                  color='primary'>Reply</Button>
          <Box component='span' mr={1}>
            <Button color='secondary'
                    onClick={() => setToggleReplyForm(false)}>Cancel</Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default reduxForm({ form: 'addReplyForm', validate })(PostDetailedReplyForm);
