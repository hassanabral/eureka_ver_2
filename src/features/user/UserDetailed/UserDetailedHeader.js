import React from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import UserDetailedHeaderInfo from './UserDetailedHeaderInfo';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  profile: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(15),
      height: theme.spacing(15),
    }
  },
  card: {
    padding: theme.spacing(3)
  },
  icon: {
    marginBottom: '-3px'
  }
}));

const UserDetailedHeader = ({ theme, user, userId }) => {
  const classes = useStyles(theme);

  const {displayName, avatarUrl, profession, company, location, bio, website, createdAt } = user;

  return (
    <Box mb={3}>
      <Card className={classes.card}>
        <Grid container className={classes.root} spacing={2}>
          <Grid item md={2.5}>
            <Avatar className={classes.profile} alt={displayName}
                    src={avatarUrl}/>
          </Grid>
          <Grid item md={8}>
            <Typography variant="h4">
              {displayName}
            </Typography>
            {<Typography variant="h6" gutterBottom={true}>
              {profession} at {company}
            </Typography>}
              <Box my={1.5}>
                <Button size='medium' fullWidth={false} variant='contained'
                        color='secondary'>+ Follow</Button>
              </Box>
            <Typography variant="body1" gutterBottom={true}>
              {bio}
            </Typography>
            <UserDetailedHeaderInfo location={location} website={website} createdAt={createdAt}/>
            <Box mt={1}>
              <Box component='span' mr={2}>
                <Typography color="secondary" display="inline" variant="body1">
                  <Link color="secondary" component={RouterLink} to='/users'>
                    <strong>15</strong> Followers
                  </Link>
                </Typography>
              </Box>
              <Typography display="inline" variant="body1">
                <Link color="secondary" component={RouterLink} to='/users'>
                  <strong>22</strong> Following
                </Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Box>

  );
};

export default UserDetailedHeader;