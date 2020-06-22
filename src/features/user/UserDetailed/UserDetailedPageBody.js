import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { Card, Box } from '@material-ui/core';
import FeedCard from '../../post/feed/FeedCard';
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

const UserDetailedPageBody = ({ theme, sectionTitle, posts, loading }) => {
  const classes = useStyles(theme);
  const isBookmarkPage = sectionTitle === 'Bookmarks';

  return (
    <Fragment>
      <Card className={classes.card}>
        <Typography variant='h5'>
          {sectionTitle}
        </Typography>
        <Box mt={2}>
          <Divider/>
        </Box>
        <Loading loading={loading}/>
        {!loading && <List className={classes.root}>
          {
            posts && posts.length > 0 ? posts.map(post =>
              <FeedCard
                key={post.id}
                post={post}
                elevateCard={false}
                marginY={0}
                dividerBottom={true}
              />) : (
              <Box mt={1}>
                {!isBookmarkPage ? <Typography>
                  User hasn't written any posts.
                </Typography> : <Typography>
                  You haven't saved any post as bookmark.
                </Typography>}
              </Box>
            )
          }

        </List>}
      </Card>
    </Fragment>
  );
};

export default UserDetailedPageBody;