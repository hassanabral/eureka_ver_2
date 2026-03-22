import React, { Fragment, useState } from 'react';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  profile: {
    width: theme.spacing(10),
    height: theme.spacing(10)
  },
  card: {
    padding: theme.spacing(3),
    margin: theme.spacing(2,1),
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(2),
      margin: theme.spacing(2, 0),
    }
  }
}));

const UserCard = ({ user }) => {
  const classes = useStyles();
  const [follow, setFollow] = useState(false);

  return (
    <Fragment>
      <Grid item lg={4} md={6} sm={12} xl={3}>
        <Card className={classes.card}>
          <Grid container className={classes.root} spacing={2}>
            <Grid item>
              <Link component={RouterLink} to={`/users/${user.id}`}>
                <Avatar className={classes.profile} alt={user.displayName}
                        src={user.avatarUrl}/>
              </Link>
            </Grid>
            <Grid item md={12}>
              <Link variant='h5' color="secondary" component={RouterLink} to={`/users/${user.id}`}>{user.displayName}</Link>
              {user.profession && user.company && <Typography variant="body1" gutterBottom={true}>
                {user.profession} at {user.company}
              </Typography>}
              <Typography variant="body2" gutterBottom={true} >
                {user.bio}
              </Typography>
              <Box my={2}>
                <Button onClick={() => setFollow(!follow)} size='medium' fullWidth={true} variant='contained' color='secondary'>{!follow ? '+ Follow' : '- Unfollow'}</Button>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Grid>

    </Fragment>
  );
};

export default UserCard;