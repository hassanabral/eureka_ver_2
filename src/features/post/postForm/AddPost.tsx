import React from 'react';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import SelectInput from '../../../app/common/form/SelectInput';
import TextInput from '../../../app/common/form/TextInput';
import { useForm, Controller } from 'react-hook-form';
import RichEditor from '../../../app/common/form/RichEditor';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import {getHashtags} from '../../../app/common/util/helpers';
import { useDispatch } from 'react-redux';
import { createPost} from '../postActions';

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

const AddPost = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { control, handleSubmit, formState: { isValid, isSubmitting } } = useForm({
    defaultValues: { title: '', body: '', status: 'unpublished' },
    mode: 'onChange',
  });

  const handleCreatePost = async (formData: any) => {
    const newPost = {...formData, hashtags: getHashtags(formData.body)}
    const post: any = await dispatch(createPost(newPost));
    navigate(`/posts/${post.id}`);
  };

  return (
    <Grid container className={classes.root} >
      <Grid item lg={8} sm={12}>
        <Card className={classes.card}>
          <Typography variant='h4'>Create Post</Typography>
          <Typography variant='subtitle1'>What is on your mind?</Typography>
          <form onSubmit={handleSubmit(handleCreatePost)}>
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
                    style={{minWidth: 100}}
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
              <Box mb={1}>
                <Typography variant='body1'>Body</Typography>
              </Box>
              <Controller
                name="body"
                control={control}
                rules={{ required: 'Body is required' }}
                render={({ field }) => (
                  <RichEditor
                    value={field.value}
                    onChange={field.onChange}
                    config={{
                      placeholder: "Enter more details (Note: you can add hashtags by including #your-tag)...",
                    }}
                  />
                )}
              />
            </Box>

            <Box mt={3}>
              <Button disabled={!isValid || isSubmitting}  type='submit' variant='outlined' color='primary' fullWidth={true}>Submit {isSubmitting && <Box ml={1.5} mb={-0.7}><CircularProgress size={20}/></Box>}</Button>
            </Box>
          </form>
        </Card>
      </Grid>
    </Grid>
  )
};

export default AddPost;
