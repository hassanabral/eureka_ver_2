import React, { useCallback } from 'react';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import { Field, reduxForm } from 'redux-form';
import { combineValidators, isRequired } from 'revalidate';
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

const validate = combineValidators({
  title: isRequired('Title'),
  body: isRequired('Body'),
  status: isRequired('Visibility'),
});

const EditPost = ({ handleSubmit, pristine, invalid, submitting, postId }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdatePost = useCallback(
    async (formData) => {
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
              <Field
                required={true}
                autoFocus={true}
                fullWidth={true}
                margin="dense"
                label="Post title"
                placeholder="Let's give this post a title"
                name="title"
                component={TextInput}
              />
            </Box>
            <Box mr={2} mb={1} component='span'>
              <Field
                required={true}
                margin="dense"
                name="status"
                label="Visibility"
                defaultValue={visibilities[1].value}
                style={{ minWidth: 100 }}
                component={SelectInput}
              >
                {visibilities.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Field>
            </Box>
            <Box mb={3} mt={3}>
              <Field
                name="body"
                config={
                  {
                    alignment: {
                      options: ['left', 'center', 'justify', 'right']
                    }
                  }
                }
                component={RichEditor}
              />
            </Box>

            <Box mt={3}>
              <Button disabled={pristine || invalid || submitting}
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

export default reduxForm({
  form: 'editPostForm',
  enableReinitialize: true,
  destroyOnUnmount: false,
  validate
})(EditPost);
