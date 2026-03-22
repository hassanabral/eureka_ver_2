import React, { Fragment, useEffect } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { Card, Box, Grid } from '@mui/material';
import UserCard from './UserCard';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../userActions';
import Loading from '../../../app/common/util/Loading';

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

const UsersPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const users = useSelector((state: any) => state.user.users);
  const loading = useSelector((state: any) => state.user.loading);

  useEffect( () => {
    const handleGetUsers= async () => {
      await dispatch(getUsers());
    }
    if(!users) {
      handleGetUsers();
    }
  }, [dispatch, users]);

  return (
    <Fragment>
      <Card className={classes.card}>
        <Typography variant='h5'>
          Users to Follow
        </Typography>
        <Box mt={2}>
          <Divider/>
        </Box>
        <Loading loading={loading}/>
        {!loading && <List className={classes.root}>
          <Grid container>
            {
              users?.length > 0 && users.map(user => <UserCard key={user.id} user={user}/>)
            }
          </Grid>
        </List>}
      </Card>
    </Fragment>
  );
};

export default UsersPage;
