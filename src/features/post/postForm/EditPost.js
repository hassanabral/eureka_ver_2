import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import { Field, reduxForm } from 'redux-form';
import { combineValidators, isRequired } from 'revalidate';
import TextInput from '../../../app/common/form/TextInput';
import SelectInput from '../../../app/common/form/SelectInput';
import RichEditor from '../../../app/common/form/RichEditor';
import Spinner from '../../../app/common/util/Spinner';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    padding: theme.spacing(5)
  }

}));


const appTypes = [
  {
    value: 'ios',
    label: 'IOS',
  },
  {
    value: 'android',
    label: 'Android',
  },
  {
    value: 'webapp',
    label: 'Web App',
  },
  {
    value: 'desktopapp',
    label: 'Desktop App',
  },
];

const visibilities = [
  {
    value: 'public',
    label: 'Public',
  },
  {
    value: 'private',
    label: 'Private',
  },
];

// const validate = combineValidators({
//   title: isRequired('Title'),
//   body: isRequired('Body'),
//   category: isRequired('Category'),
//   status: isRequired('Visibility'),
// });

const EditPost = ({ theme }) => {
  const classes = useStyles(theme);

  return (
    <Grid container className={classes.root} spacing={5}>
      <Grid item lg={8} sm={12}>
        <Card className={classes.card}>
          <Typography variant='h3'>Edit Post</Typography>
          <Typography variant='subtitle1'>Update and save your post <span style={{visibility: 'hidden'}}>sssssssss</span></Typography>
          <form>
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
              <Field
                name="body"
                config={
                  {
                    alignment: {
                      options: [ 'left', 'center', 'justify', 'right']
                    }
                  }
                }
                component={RichEditor}
              />
            </Box>

            <Box mt={3}>
              <Button type='submit' variant='outlined' color='primary' fullWidth={true}>Save</Button>
            </Box>
          </form>

        </Card>
      </Grid>
      <Grid item lg={4} sm={12}>
      </Grid>
    </Grid>)
};

export default EditPost;
