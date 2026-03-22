import React, { Fragment, useState, useEffect } from 'react';
import FeedsPageHeader from './FeedsPageHeader';
import FeedsPageBody from './FeedsPageBody';
import FeedsPageSidebarRight from './FeedsPageSidebarRight';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useSelector, useDispatch } from 'react-redux';
import { getPagedFeeds } from '../postActions';
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

const FeedsPage = () => {

  const auth = useSelector((state: any) => state.auth);
  const displayName = auth.currentUser?.displayName;
  const uid = auth.currentUser?.uid;
  const photoURL = auth.currentUser?.photoURL;

  const dispatch = useDispatch();
  const [loadingInitial, setLoadingInitial] = useState(true);

  const feeds = useSelector((state: any) => state.post.feeds);
  const moreFeeds = useSelector((state: any) => state.post.moreFeeds);
  const loading = useSelector((state: any) => state.post.loading);

  useEffect(() => {
    // this function gets called at the start
    const getFeeds = async () => {
      await dispatch(getPagedFeeds());
    };

    if (feeds.length === 0) {
      getFeeds().then(() => {
        setLoadingInitial(false);
      });
    } else {
      setLoadingInitial(false);
    }

  }, [dispatch, feeds.length]);

  const handleGetNextFeeds = async () => {
    await dispatch(getPagedFeeds());
  };

  const classes = useStyles();

  if (loadingInitial) return <Spinner/>;
  return (
    <Fragment>
      <Grid container className={classes.root}>
        <Grid item lg={8} sm={12}>
          <Grid container className={classes.root}>
            <Grid item sm={12}>
              {uid && <FeedsPageHeader user={{ displayName, uid, photoURL }}/>}
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
