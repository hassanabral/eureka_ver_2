import React, {Fragment} from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Link from '@material-ui/core/Link';
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
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
      margin: theme.spacing(2, 0),
    }
  }
}));

const UserCard = ({ theme }) => {
  const classes = useStyles(theme);

  return (
    <Fragment>
      <Grid item lg={4} md={6} sm={12} xl={3}>
        <Card className={classes.card}>
          <Grid container className={classes.root} spacing={2}>
            <Grid item md={2.5}>
              <Link component={RouterLink} to={`/users/1`}>
                <Avatar className={classes.profile} alt="Remy Sharp"
                        src=''/>
              </Link>
            </Grid>
            <Grid item md={12}>
              <Link variant='h5' color="secondary" component={RouterLink} to={`/users/1`}>John Doe</Link>
              <Typography variant="body1" gutterBottom={true}>
                Software Engineer at TechUp
              </Typography>
              <Typography variant="body2" gutterBottom={true} >
                This is john doe!
              </Typography>
              <Box my={2}>
                <Button size='medium' fullWidth={true} variant='contained' color='secondary'>+ Follow</Button>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Grid>

    </Fragment>
  );
};

export default UserCard;