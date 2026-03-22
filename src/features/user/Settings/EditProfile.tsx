import React, { Fragment, useCallback } from 'react';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import { useForm, Controller } from 'react-hook-form';
import TextInput from '../../../app/common/form/TextInput';
import CircularProgress from '@mui/material/CircularProgress';
import SelectInput from '../../../app/common/form/SelectInput';
import TextArea from '../../../app/common/form/TextArea';
import MenuItem from '@mui/material/MenuItem';
import Spinner from '../../../app/common/util/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../userActions';
import { useNavigate } from 'react-router-dom';

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

const isValidUrl = (value: string) => {
  if (!value) return true;
  const pattern = new RegExp('^(https?:\\/\\/)?'+
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
    '((\\d{1,3}\\.){3}\\d{1,3}))'+
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
    '(\\?[;&a-z\\d%_.~+=-]*)?'+
    '(\\#[-a-z\\d_]*)?$','i');
  return pattern.test(value) || 'Please enter valid URL';
};

const EditProfile = ({ initialValues }: any) => {

  const uid = useSelector((state: any) => state.auth.currentUser?.uid);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { control, handleSubmit, formState: { isValid, isSubmitting, isDirty } } = useForm({
    defaultValues: initialValues || {},
    values: initialValues,
    mode: 'onChange',
  });

  const handleUpdateProfile = useCallback(
    async (formData: any) => {
      await dispatch(updateProfile(formData, uid));
      navigate(`/users/${uid}`);
    }, [dispatch, navigate, uid]
  );

  const classes = useStyles();

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
                <Controller
                  name="profession"
                  control={control}
                  rules={{ required: 'Job title is required' }}
                  render={({ field, fieldState }) => (
                    <TextInput
                      {...field}
                      required
                      label="Job Title"
                      placeholder="Student, Teacher, Developer, etc."
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Box>
              <Box mr={2} mb={1} component='span'>
                <Controller
                  name="company"
                  control={control}
                  rules={{ required: 'Company or school is required' }}
                  render={({ field, fieldState }) => (
                    <TextInput
                      {...field}
                      required
                      label="Company or School"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Box>
              <Box mb={1}>
                <Controller
                  name="location"
                  control={control}
                  render={({ field }) => (
                    <TextInput
                      {...field}
                      fullWidth
                      label="Location"
                      placeholder="City, State"
                    />
                  )}
                />
              </Box>
              <Box mb={1}>
                <Controller
                  name="interests"
                  control={control}
                  render={({ field }) => (
                    <TextInput
                      {...field}
                      fullWidth
                      label="Interests"
                      placeholder="Reading, Swimming, Hiking etc."
                    />
                  )}
                />
              </Box>
              <Box mr={2.5} mb={1} component='span'>
                <Controller
                  name="website"
                  control={control}
                  rules={{ validate: isValidUrl }}
                  render={({ field, fieldState }) => (
                    <TextInput
                      {...field}
                      label="Website"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Box>
              <Box mr={2.5} mb={1} component='span'>
                <Controller
                  name="githubUsername"
                  control={control}
                  render={({ field }) => (
                    <TextInput
                      {...field}
                      label="Github Profile"
                    />
                  )}
                />
              </Box>
              <Box mb={1} component='span'>
                <Controller
                  name="status"
                  control={control}
                  rules={{ required: 'User status is required' }}
                  render={({ field, fieldState }) => (
                    <SelectInput
                      {...field}
                      required
                      label="User Status"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    >
                      {userStatuses.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </SelectInput>
                  )}
                />
              </Box>
              <Box mb={3}>
                <Controller
                  name="bio"
                  control={control}
                  render={({ field }) => (
                    <TextArea
                      {...field}
                      label="Bio"
                      fullWidth
                      rows="4"
                      placeholder="Tell us a little bit about yourself..."
                    />
                  )}
                />
              </Box>
              <Box mt={3}>
                <Button disabled={!isDirty || !isValid || isSubmitting}
                        type='submit'
                        variant='outlined'
                        color='primary'
                        fullWidth={true}>
                  Save {isSubmitting && <Box ml={1.5} mb={-0.7}><CircularProgress size={20}/></Box>}
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

export default EditProfile;
