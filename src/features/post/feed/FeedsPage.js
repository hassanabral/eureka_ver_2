import React, { Fragment, useState, useEffect } from 'react';
import FeedsPageHeader from './FeedsPageHeader';
import FeedsPageBody from './FeedsPageBody';
import FeedsPageSidebarRight from './FeedsPageSidebarRight';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useSelector, useDispatch } from 'react-redux';
import { getPagedFeeds } from '../postActions';
import { useFirestore } from 'react-redux-firebase';
import Spinner from '../../../app/common/util/Spinner';
import Loading from '../../../app/common/util/Loading';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginBottom: '25px'
  },
  spinner: {
    display: 'flex',
    justifyContent: 'center'
  }
}));

const FeedsPage = ({ theme }) => {

  const { displayName, uid, photoURL } = useSelector((state) => state.firebase.auth);

  const dispatch = useDispatch();
  const firestore = useFirestore();
  const [loadingInitial, setLoadingInitial] = useState(true);

  const feeds = useSelector(state => state.post.feeds);
  const moreFeeds = useSelector(state => state.post.moreFeeds);
  const loading = useSelector(state => state.post.loading);

  useEffect(() => {
    // this function gets called at the start
    const getFeeds = async () => {
      await dispatch(getPagedFeeds({ firestore }));
    };

    if (feeds.length === 0) {
      getFeeds().then(() => {
        setLoadingInitial(false);
      });
    } else {
      setLoadingInitial(false);
    }

  }, [dispatch, firestore, feeds.length]);

  const handleGetNextFeeds = async () => {
    await dispatch(getPagedFeeds({ firestore }));
  };

  const classes = useStyles(theme);

  if (loadingInitial) return <Spinner/>;
  return (
    <Fragment>
      <Grid container className={classes.root}>
        <Grid item lg={8} sm={12}>
          <Grid container className={classes.root}>
            <Grid item sm={12}>
              <FeedsPageHeader user={{ displayName, uid, photoURL }}/>
            </Grid>
            <Grid item sm={12}>
              <FeedsPageBody feeds={feeds} loading={loading} moreFeeds={moreFeeds}
                             getNextFeeds={handleGetNextFeeds}/>
             <Loading loading={loading}/>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={4} sm={12}>
          <FeedsPageSidebarRight/>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default FeedsPage;
