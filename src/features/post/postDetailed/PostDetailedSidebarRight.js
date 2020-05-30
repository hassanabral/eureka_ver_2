import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import UserDetailedHeaderInfo from '../../user/UserDetailed/UserDetailedHeaderInfo';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  profile: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(12.5),
      height: theme.spacing(12.5),
    }
  }
}));

const PostDetailedSidebarRight = ({ theme }) => {
  const classes = useStyles(theme);

  return (
    <Fragment>
      <Grid container className={classes.root} spacing={2}>
        <Grid item md={2.5}>
          <Avatar className={classes.profile} alt='John Doe'
                  src=''/>
        </Grid>
        <Grid item md={12}>
          <Typography variant="h4">
            John Doe
          </Typography>
          <Typography variant="h6" gutterBottom={true}>
            Software Engineer at TechUp
          </Typography>
          <Typography variant="body1" gutterBottom={true}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut excepturi
            explicabo fugiat illum laborum magni modi officiis quas repudiandae voluptate!
            Error esse expedita impedit ipsa magni nihil, odit quas velit.
          </Typography>
          <UserDetailedHeaderInfo/>
          <Box my={2}>
            <Button size='large' fullWidth={true} variant='contained' color='secondary'>+
              Follow</Button>
          </Box>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default PostDetailedSidebarRight;