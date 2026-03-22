import React, { Fragment } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { Box, Card, Grid } from '@mui/material';
import DashboardPostCard from './DashboardPostCard';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ButtonGroup from '@mui/material/ButtonGroup';
import CreateIcon from '@mui/icons-material/Create';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Link from '@mui/material/Link';
import useMediaQuery from '@mui/material/useMediaQuery';
import Loading from '../../app/common/util/Loading';
import { useFirestoreQuery } from '../../app/hooks/useFirestoreQuery';

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

const Dashboard = () => {
  const classes = useStyles();

  const auth = useSelector((state: any) => state.auth);
  const displayName = auth.currentUser?.displayName;
  const uid = auth.currentUser?.uid;
  const isMobileScreen = useMediaQuery('(max-width:600px)');

  const { data: dashboardPosts, loading } = useFirestoreQuery({
    collection: 'posts',
    where: [['authorId', '==', uid], ['deleted', '==', false]],
    orderBy: ['date', 'desc']
  });

  return <Fragment>
    <Box mb={2}>
      <Card className={classes.card}>
        <Box my={1}>
          <Typography variant='h5'>
            <PersonIcon className={classes.icon}/>
            Welcome {displayName}
          </Typography>
        </Box>
        <Box mt={1.5}>
          <ButtonGroup size={isMobileScreen ? 'small' : 'medium'}
                       aria-label="button group">
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
      <Loading loading={!dashboardPosts && loading}/>
      {
        dashboardPosts?.length > 0 && <List className={classes.root}>
          <Grid container>
            {
              dashboardPosts.map(post => <DashboardPostCard key={post.id} post={post}/>)
            }
          </Grid>

        </List>
      }
      {dashboardPosts?.length === 0 &&
      <Box mt={2}>
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
