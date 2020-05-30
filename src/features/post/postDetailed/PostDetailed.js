import React, { Fragment, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import PostDetailedSidebarRight from './PostDetailedSidebarRight';
import PostDetailedBody from './PostDetailedBody';
import PostDetailedAddComment from './PostDetailedAddComment';
import PostDetailedComments from './PostDetailedComments';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    padding: theme.spacing(5),
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3),
    }
  }

}));

const PostDetailed = ({ theme }) => {
  const classes = useStyles(theme);

  const mainDiv =<Fragment>
      <Grid container className={classes.root} spacing={3}>
        <Grid item lg={8} sm={12}>
          <Card className={classes.card}>
            <PostDetailedBody/>
          </Card>
            <Card className={classes.card}>
              <PostDetailedAddComment/>
            </Card>
            <PostDetailedComments/>
        </Grid>
        <Grid item lg={4} sm={12}>
          <Card className={classes.card}>
             <PostDetailedSidebarRight/>
          </Card>
        </Grid>
      </Grid>
    </Fragment>;

  return mainDiv;
};
export default PostDetailed;
