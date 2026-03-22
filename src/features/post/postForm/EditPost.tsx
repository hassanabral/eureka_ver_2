import React, { useCallback } from 'react';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import { useForm, Controller } from 'react-hook-form';
import TextInput from '../../../app/common/form/TextInput';
import SelectInput from '../../../app/common/form/SelectInput';
import RichEditor from '../../../app/common/form/RichEditor';
import { useDispatch } from 'react-redux';
import { updatePost } from '../postActions';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    padding: theme.spacing(5)
  }

}));

const visibilities = [
  {
    value: 'published',
    label: 'Published',
  },
  {
    value: 'unpublished',
    label: 'Unpublished',
  },
];

const EditPost = ({ initialValues, postId }: any) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { control, handleSubmit, formState: { isValid, isSubmitting, isDirty } } = useForm({
    defaultValues: initialValues || {},
    values: initialValues,
    mode: 'onChange',
  });

  const handleUpdatePost = useCallback(
    async (formData: any) => {
      await dispatch(updatePost(formData, postId));
      navigate(`/posts/${postId}`);
    }, [dispatch, navigate, postId]
  );

  return (
    <Grid container className={classes.root}>
      <Grid item lg={8} sm={12}>
        <Card className={classes.card}>
          <Typography variant='h4'>Edit Post</Typography>
          <Typography variant='subtitle1'>Update and save your post</Typography>
          <form onSubmit={handleSubmit(handleUpdatePost)}>
            <Box mb={1}>
              <Controller
                name="title"
                control={control}
                rules={{ required: 'Title is required' }}
                render={({ field, fieldState }) => (
                  <TextInput
                    {...field}
                    label="Post title"
                    placeholder="Let's give this post a title"
                    required
                    autoFocus
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Box>
            <Box mr={2} mb={1} component='span'>
              <Controller
                name="status"
                control={control}
                rules={{ required: 'Visibility is required' }}
                render={({ field, fieldState }) => (
                  <SelectInput
                    {...field}
                    required
                    label="Visibility"
                    style={{ minWidth: 100 }}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  >
                    {visibilities.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </SelectInput>
                )}
              />
            </Box>
            <Box mb={3} mt={3}>
              <Controller
                name="body"
                control={control}
                rules={{ required: 'Body is required' }}
                render={({ field }) => (
                  <RichEditor
                    value={field.value}
                    onChange={field.onChange}
                    config={{
                      alignment: {
                        options: ['left', 'center', 'justify', 'right']
                      }
                    }}
                  />
                )}
              />
            </Box>

            <Box mt={3}>
              <Button disabled={!isDirty || !isValid || isSubmitting}
                      type='submit'
                      variant='outlined'
                      color='primary'
                      fullWidth={true}>Save</Button>
            </Box>
          </form>

        </Card>
      </Grid>
      <Grid item lg={4} sm={12}>
      </Grid>
    </Grid>);
};

export default EditPost;
