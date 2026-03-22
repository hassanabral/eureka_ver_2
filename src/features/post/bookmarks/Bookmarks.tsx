import React, { Fragment, useEffect } from 'react';
import UserDetailedPageBody from '../../user/UserDetailed/UserDetailedPageBody';
import Grid from '@mui/material/Grid';
import {getBookmarks} from '../postActions';
import { useDispatch, useSelector } from 'react-redux';

const Bookmarks = () => {

  const bookmarks = useSelector((state: any) => state.post.bookmarks);
  const loading = useSelector((state: any) => state.post.loading);
  const dispatch = useDispatch();

  useEffect( () => {
    const handleGetBookmarks = async () => {
      await dispatch(getBookmarks());
    }
    // only get bookmarks from backend if "bookmark" is null
    if(!bookmarks) {
      handleGetBookmarks();
    }
  }, [dispatch, bookmarks]);

  return (
    <Fragment>
      <Grid container>
        <Grid item lg={8} sm={12} style={{width: '100%'}}>
          {<UserDetailedPageBody sectionTitle={'Bookmarks'} posts={bookmarks} loading={loading}/>}
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Bookmarks;
