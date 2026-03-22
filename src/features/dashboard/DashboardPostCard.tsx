import React, { Fragment } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import FeedCardButtons from '../post/feed/FeedCardButtons';
import ButtonGroup from '@mui/material/ButtonGroup';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import { stripTags, truncate } from '../../app/common/util/helpers';
import { deletePost } from '../post/postActions';

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
    margin: theme.spacing(2, 1),
    border: '1px solid rgba(0, 0, 0, 0.12)',
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(3),
      margin: theme.spacing(2, 0),
    }
  },
  deleteButton: {
    color: '#f44336',
    borderColor: '#f44336',
    '&:hover': {
      backgroundColor: '#ffebee'
    }
  }
}));

const DashboardPostCard = ({ post }) => {
  const classes = useStyles();
  const renderBody = stripTags(truncate(post.body, 200));
  const isLongText = renderBody.substr(renderBody.length - 4, renderBody.length) ===
    '... ';

  return (
    <Fragment>
      <Grid item lg={4} md={6} sm={12} xl={3} style={{width: '100%'}}>
        <Card className={classes.card} elevation={0}>
          <Grid container className={classes.root} spacing={2}>
            <Grid item md={12}>
              <Link variant='h5' color="secondary" component={RouterLink}
                    to={`/posts/${post.id}`}>{post.title}</Link>
              <Box mt={0.5} mb={1}>
                <Typography variant="body2" style={{ color: '#757575' }}>
                  Written on {moment(post.date.toDate()).format('LL')}
                </Typography>
              </Box>
              <Typography variant="body1" paragraph={true}>
                {renderBody}
                {isLongText && <Link variant='body1' component={RouterLink}
                                     to={`/posts/${post.id}`}>(more)</Link>}
              </Typography>
              <Box mb={2}>
                <FeedCardButtons postId={post.id} likeCount={post.likeCount} commentCount={post.commentCount}
                                 savedCount={post.savedCount}/>
              </Box>
              <Box mt={2}>
                <ButtonGroup size='small' aria-label="button group">
                  <Button color='primary'
                          component={RouterLink}
                          to={`/posts/edit/${post.id}`}
                          startIcon={<EditIcon/>}>
                    Edit
                  </Button>
                  <Button
                    onClick={() => deletePost(post.id)}
                    className={classes.deleteButton} startIcon={<DeleteIcon/>}>Delete</Button>
                </ButtonGroup>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Fragment>
  );
};

export default DashboardPostCard;
