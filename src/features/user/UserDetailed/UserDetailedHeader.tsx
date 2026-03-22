import React, {useState} from 'react';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import makeStyles from '@mui/styles/makeStyles';
import UserDetailedHeaderInfo from './UserDetailedHeaderInfo';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  profile: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    [theme.breakpoints.down('md')]: {
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

const UserDetailedHeader = ({ user, userId }: { user: any; userId?: string }) => {
  const classes = useStyles();
  const [follow, setFollow] = useState(false);

  const { displayName, avatarUrl, profession, company, location, bio, website, createdAt } = user;

  return (
    <Box mb={3}>
      <Card className={classes.card}>
        <Grid container className={classes.root} spacing={2}>
          <Grid item>
            <Avatar className={classes.profile} alt={displayName}
                    src={avatarUrl}/>
          </Grid>
          <Grid item md={8}>
            <Typography variant="h4">
              {displayName}
            </Typography>
            {profession && company && <Typography variant="h6" gutterBottom={true}>
              {profession} at {company}
            </Typography>}
            <Box my={1.5}>
              <Button onClick={() => setFollow(!follow)} size='medium' fullWidth={false} variant='contained'
                      color='secondary'>{!follow ? '+ Follow' : '- Unfollow'}</Button>
            </Box>
            <Typography variant="body1" gutterBottom={true}>
              {bio}
            </Typography>
            <UserDetailedHeaderInfo location={location} website={website}
                                    createdAt={createdAt}/>
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