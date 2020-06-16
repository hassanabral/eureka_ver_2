import React, { Fragment, useEffect } from 'react';
import UserDetailedPageBody from '../../user/UserDetailed/UserDetailedPageBody';
import Grid from '@material-ui/core/Grid';
import BookmarksSidebarRight from './BookmarksSidebarRight';
import { useFirestore } from 'react-redux-firebase';
import {getBookmarks} from '../postActions';
import { useDispatch, useSelector } from 'react-redux';

const Bookmarks = () => {

  const bookmarks = useSelector(state => state.post.bookmarks);
  const firestore = useFirestore();
  const dispatch = useDispatch();

  useEffect( () => {
    const handleGetBookmarks = async () => {
      await dispatch(getBookmarks(firestore));
    }
    // only get bookmarks from backend if "bookmark" is null
    if(!bookmarks) {
      handleGetBookmarks();
    }
  }, [firestore, dispatch, bookmarks]);

  return (
    <Fragment>
      <Grid container spacing={5}>
        <Grid item lg={8} sm={12}>
          {bookmarks && <UserDetailedPageBody sectionTitle={'Bookmarks'} posts={bookmarks}/>}
        </Grid>
        <Grid item lg={4} sm={12}>
          <BookmarksSidebarRight/>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Bookmarks;