import React, { Fragment } from 'react';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import UserDetailedHeaderInfo from '../../user/UserDetailed/UserDetailedHeaderInfo';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Loading from '../../../app/common/util/Loading';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { useFirestoreDoc } from '../../../app/hooks/useFirestoreDoc';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  profile: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    [theme.breakpoints.down('md')]: {
      width: theme.spacing(12.5),
      height: theme.spacing(12.5),
    }
  }
}));

const PostDetailedSidebarRight = ({ authorId }) => {
  const classes = useStyles();

  const { data: user, loading } = useFirestoreDoc('users', authorId);

  return (
    <Fragment>
      <Loading loading={!user && loading}/>
      {
        user && <Grid container className={classes.root} spacing={2}>
          <Grid item>
            <Avatar component={RouterLink}
                    to={`/users/${authorId}`}
                    className={classes.profile} alt={user.displayName}
                    src={user.avatarUrl}/>
          </Grid>
          <Grid item md={12}>
            <Link variant='h4' color="secondary" component={RouterLink}
                  to={`/users/${authorId}`}>{user.displayName}</Link>
            <Typography variant="h6" gutterBottom={true}>
              {user.profession} at {user.company}
            </Typography>
            <Typography variant="body1" gutterBottom={true}>
              {user.bio}
            </Typography>
            <UserDetailedHeaderInfo location={user.location} website={user.website} createdAt={user.createdAt}/>
            <Box my={2}>
              <Button size='large' fullWidth={true} variant='contained' color='secondary'>+
                Follow</Button>
            </Box>
          </Grid>
        </Grid>
      }
    </Fragment>
  );
};

export default PostDetailedSidebarRight;
