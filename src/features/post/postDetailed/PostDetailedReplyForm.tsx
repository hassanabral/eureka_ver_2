import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addReply } from '../postActions';
import TextArea from '../../../app/common/form/TextArea';

const PostDetailedReplyForm = ({ setToggleReplyForm, commentId, setToggleReplies }: any) => {

  const dispatch = useDispatch();

  const { control, handleSubmit, formState: { isValid, isSubmitting } } = useForm({
    defaultValues: { commentBody: '' },
    mode: 'onChange',
  });

  const handleAddReply = async (formData: any) => {
    await dispatch(addReply(
      { ...formData, commentBody: `<p>${formData.commentBody}</p>` },
      commentId, setToggleReplies));
    setToggleReplyForm(false);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(handleAddReply)}>
        <Controller
          name="commentBody"
          control={control}
          rules={{ required: 'Reply body is required' }}
          render={({ field, fieldState }) => (
            <TextArea
              {...field}
              required
              label="Add a reply..."
              fullWidth
              rows="3"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Box display='flex' flexDirection='row-reverse' m={1}>
          <Button disabled={!isValid || isSubmitting} type='submit' variant='contained'
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

export default PostDetailedReplyForm;
