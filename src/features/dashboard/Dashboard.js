import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { Box, Card, Grid } from '@material-ui/core';
import DashboardPostCard from './DashboardPostCard';
import Button from '@material-ui/core/Button';
import PersonIcon from '@material-ui/icons/Person';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CreateIcon from '@material-ui/icons/Create';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import Link from '@material-ui/core/Link';
import useMediaQuery from '@material-ui/core/useMediaQuery';

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
  },
  icon: {
    marginBottom: '-4px',
    marginRight: '4px'
  },
  successButton: {
    color: '#4caf50',
    borderColor: '#4caf50',
    '&:hover': {
      backgroundColor: '#f1f8e9'
    }
  }
}));

const Dashboard = ({ theme }) => {
  const classes = useStyles(theme);

  const { displayName, uid } = useSelector((state) => state.firebase.auth);
  const isMobileScreen = useMediaQuery('(max-width:600px)');

  const dashboardPostsQuery = {
    collection: 'posts',
    where: [['authorId', '==', uid], ['deleted', '==', false]],
    orderBy: ['date', 'desc'],
    storeAs: 'dashboardPosts'
  };

  useFirestoreConnect(dashboardPostsQuery);

  const dashboardPosts = useSelector((state) => state.firestore.ordered.dashboardPosts);

  return <Fragment>
    <Box mb={2}>
      <Card className={classes.card}>
        <Box my={1}>
          <Typography variant='h3'>
            Dashboard
          </Typography>
        </Box>
        <Box my={1}>
          <Typography variant='h5'>
            <PersonIcon className={classes.icon}/>
            Welcome {displayName}
          </Typography>
        </Box>
        <Box mt={1.5}>
          <ButtonGroup size={isMobileScreen ? "small" : "medium"}  aria-label="button group">
            <Button color='primary' component={RouterLink} to='/edit-profile'
                    startIcon={<AccountCircleIcon/>}>
              Edit Profile
            </Button>
            <Button className={classes.successButton} component={RouterLink}
                    to='/posts/add' startIcon={<CreateIcon/>}>
              Create Post</Button>
          </ButtonGroup>
        </Box>
      </Card>
    </Box>

    <Card className={classes.card}>
      <Box my={1}>
        <Typography variant='h5'>
          My Posts
        </Typography>
      </Box>
      <Box mt={2} mb={0.5}>
        <Divider/>
      </Box>
      {
        dashboardPosts?.length > 0 ? (<List className={classes.root}>
          <Grid container>
            {
              dashboardPosts.map(post => <DashboardPostCard key={post.id} post={post}/>)
            }
          </Grid>

        </List>) : <Box mt={2}>
          <Typography>
            You have't written any posts. Click <Link component={RouterLink}
                                                      to='/posts/add'>here</Link> to create
            a post.
          </Typography>
        </Box>
      }

    </Card>
  </Fragment>;
};

export default Dashboard;
