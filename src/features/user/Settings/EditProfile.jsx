import React, { Fragment, useCallback } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import PersonIcon from '@material-ui/icons/Person';
import { Field, reduxForm } from 'redux-form';
import { combineValidators, composeValidators, isRequired } from 'revalidate';
import TextInput from '../../../app/common/form/TextInput';
import CircularProgress from '@material-ui/core/CircularProgress';
import { isValidUrl } from '../../../app/common/util/validator';
import SelectInput from '../../../app/common/form/SelectInput';
import TextArea from '../../../app/common/form/TextArea';
import MenuItem from '@material-ui/core/MenuItem';
import Spinner from '../../../app/common/util/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';
import { updateProfile } from '../userActions';
import { useHistory } from 'react-router-dom';

const validate = combineValidators({
  website: composeValidators(
    isValidUrl
  )(),
  profession: isRequired('Job title'),
  company: isRequired('Company or school'),
  status: isRequired('User status'),
});

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    padding: theme.spacing(5)
  },
  icon: {
    marginBottom: '-4px',
    marginRight: '4px'
  },

}));

const userStatuses = [
  {
    value: 'developer',
    label: 'Developer',
  },
  {
    value: 'public',
    label: 'Regular User',
  },
];

const EditProfile = ({ theme, handleSubmit, pristine, invalid, submitting }) => {

  const { uid } = useSelector((state) => state.firebase.auth);


  const dispatch = useDispatch();
  const firebase = useFirebase();
  const history = useHistory();

  const handleUpdateProfile = useCallback(
    (formData) => {
      return dispatch(updateProfile({firebase}, formData, history, uid))
    }, [firebase, dispatch, history, uid]
  );

  const classes = useStyles(theme);

  const loading = false;

  return loading ? (<Spinner/>) : (
    <Fragment>
      <Grid container className={classes.root}>
        <Grid item lg={8} sm={12}>
          <Card className={classes.card}>
            <Typography variant='h4'>Edit Profile</Typography>
            <Typography variant='subtitle1'>
              <PersonIcon className={classes.icon}/>
              Let's get some information to make your profile stand out</Typography>
            <form onSubmit={handleSubmit(handleUpdateProfile)}>
              <Box mr={2.5} mb={1} component='span'>
                <Field
                  required
                  margin="dense"
                  label="Job Title"
                  placeholder='Student, Teacher, Developer, etc.'
                  name="profession"
                  component={TextInput}
                />
              </Box>
              <Box mr={2} mb={1} component='span'>
                <Field
                  required
                  margin="dense"
                  label="Company or School"
                  name="company"
                  component={TextInput}
                />
              </Box>
              <Box mb={1}>
                <Field
                  fullWidth={true}
                  label="Location"
                  placeholder='City, State'
                  margin="dense"
                  name="location"
                  component={TextInput}
                />
              </Box>
              <Box mb={1}>
                <Field
                  fullWidth={true}
                  margin="dense"
                  name="interests"
                  label="Interests"
                  placeholder='Reading, Swimming, Hiking etc.'
                  component={TextInput}
                />
              </Box>
              <Box mr={2.5} mb={1} component='span'>
                <Field
                  margin="dense"
                  name="website"
                  label="Website"
                  component={TextInput}
                />
              </Box>
              <Box mr={2.5} mb={1} component='span'>
                <Field
                  margin="dense"
                  name="githubUsername"
                  label="Github Profile"
                  component={TextInput}
                />
              </Box>
              <Box mb={1} component='span'>
                <Field
                  required={true}
                  margin="dense"
                  name="status"
                  label="User Status"
                  defaultValue={userStatuses[1].value}
                  component={SelectInput}
                >
                  {userStatuses.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Field>
              </Box>
              <Box mb={3}>
                <Field
                  margin="dense"
                  name="bio"
                  label="Bio"
                  multiline={true}
                  fullWidth={true}
                  rows="4"
                  placeholder="Tell us a little bit about yourself..."
                  component={TextArea}
                />
              </Box>
              <Box mt={3}>
                <Button disabled={pristine || invalid || submitting}
                        type='submit'
                        variant='outlined'
                        color='primary'
                        fullWidth={true}>
                  Save {submitting && <Box ml={1.5} mb={-0.7}><CircularProgress size={20}/></Box>}
                </Button>
              </Box>
            </form>
          </Card>
        </Grid>
        <Grid item lg={4} sm={12}>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default reduxForm({
  form: 'editProfileForm',
  enableReinitialize: true,
  destroyOnUnmount: false,
  validate
})(EditProfile);