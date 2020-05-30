import React, { Fragment, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { Card, Box, Grid } from '@material-ui/core';
import UserCard from './UserCard';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  card: {
    padding: theme.spacing(3),
  },
  divider: {
    marginTop: theme.spacing(2),
  }
}));

const UsersPage = ({ theme }) => {
  const classes = useStyles(theme);

  return (
    <Fragment>
      <Card className={classes.card}>
        <Typography variant='h5'>
          Users to Follow
        </Typography>
        <Box mt={2}>
          <Divider/>
        </Box>
        <List className={classes.root}>
          <Grid container spacing={20}>
            <UserCard/>
            <UserCard/>
            <UserCard/>
            <UserCard/>
            <UserCard/>
          </Grid>
        </List>
      </Card>
    </Fragment>
  );
};

export default UsersPage;
