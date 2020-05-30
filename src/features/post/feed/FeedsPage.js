import React, { Fragment, useEffect, useMemo } from 'react';
import FeedsPageHeader from './FeedsPageHeader';
import FeedsPageBody from './FeedsPageBody';
import FeedsPageSidebarRight from './FeedsPageSidebarRight';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

const FeedsPage = ({ theme}) => {

  const { displayName, uid, photoURL} = useSelector((state) => state.firebase.auth);


  const classes = useStyles(theme);

  return (
    <Fragment>
      <Grid container className={classes.root} spacing={5}>
        <Grid item lg={8} sm={12}>
          <Grid container className={classes.root}>
              <Grid item sm={12}>
                 <FeedsPageHeader user={{displayName, uid, photoURL}}/>
              </Grid>
            <Grid item sm={12}>
              <FeedsPageBody/>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={4} sm={12}>
          <FeedsPageSidebarRight/>
        </Grid>
      </Grid>
    </Fragment>
  )
};

export default FeedsPage;
