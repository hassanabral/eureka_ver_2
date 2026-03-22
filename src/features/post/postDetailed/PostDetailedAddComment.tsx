import React, { Fragment } from 'react';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useForm, Controller } from 'react-hook-form';
import RichEditor from '../../../app/common/form/RichEditor';
import { addComment } from '../postActions';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  }
}));

const PostDetailedAddComment = ({ postId }: any) => {
  const dispatch = useDispatch();

  const { control, handleSubmit, reset, formState: { isValid, isSubmitting } } = useForm({
    defaultValues: { commentBody: '' },
    mode: 'onChange',
  });

  const handleAddComment = async (formData: any) => {
    await dispatch(addComment(formData, postId));
    reset();
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
          <Controller
            name="commentBody"
            control={control}
            rules={{ required: 'Comment body is required' }}
            render={({ field }) => (
              <RichEditor
                value={field.value}
                onChange={field.onChange}
                config={{
                  placeholder: "Add a comment...",
                }}
              />
            )}
          />
          <Box display='flex' flexDirection='row-reverse' mt={2}>
            <Button disabled={!isValid || isSubmitting} type='submit'  variant='contained' color='primary'>Submit</Button>
          </Box>
        </form>
      </Fragment>
  )
};

export default PostDetailedAddComment;
