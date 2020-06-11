import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import SelectInput from '../../../app/common/form/SelectInput';
import TextInput from '../../../app/common/form/TextInput';
import { Field, reduxForm } from 'redux-form';
import { combineValidators, isRequired } from 'revalidate';
import RichEditor from '../../../app/common/form/RichEditor';
import { useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import {getHashtags} from '../../../app/common/util/helpers';
import { useDispatch } from 'react-redux';
import { useFirebase, useFirestore } from 'react-redux-firebase';
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

const validate = combineValidators({
  title: isRequired('Title'),
  body: isRequired('Body'),
  status: isRequired('Visibility'),
});

const AddPost = ({ theme, handleSubmit, invalid, submitting }) => {
  const classes = useStyles(theme);
  const history = useHistory();
  const dispatch = useDispatch();
  const firebase = useFirebase();
  const firestore = useFirestore();

  const handleCreatePost = async formData => {
    const newPost = {...formData, hashtags: getHashtags(formData.body)}
    const post = await dispatch(createPost({firebase, firestore}, newPost));
    history.push(`/posts/${post.id}`);
  };

  return (
    <Grid container className={classes.root} spacing={5}>
      <Grid item lg={8} sm={12}>
        <Card className={classes.card}>
          <Typography variant='h3'>Create Post</Typography>
          <Typography variant='subtitle1'>What is on your mind?</Typography>
          <form onSubmit={handleSubmit(handleCreatePost)}>
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
                style={{minWidth: 100}}
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
              <Box mb={1}>
                <Typography variant='body1'>Body</Typography>
              </Box>
              <Field
                name="body"
                config={
                  {
                    placeholder:"Enter more details (Note: you can add hashtags by including #your-tag)...",
                  }
                }
                component={RichEditor}
              />
            </Box>

            <Box mt={3}>
              <Button disabled={invalid || submitting}  type='submit' variant='outlined' color='primary' fullWidth={true}>Submit {submitting && <Box ml={1.5} mb={-0.7}><CircularProgress size={20}/></Box>}</Button>
            </Box>
          </form>

        </Card>
      </Grid>
      <Grid item lg={4} sm={12}>
      </Grid>
    </Grid>
  )
};

export default reduxForm({ form: 'addPostForm', validate})(AddPost);
