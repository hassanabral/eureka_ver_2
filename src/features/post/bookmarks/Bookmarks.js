import React, {Fragment} from 'react';
import UserDetailedPageBody from '../../user/UserDetailed/UserDetailedPageBody';
import Grid from '@material-ui/core/Grid';
import BookmarksSidebarRight from './BookmarksSidebarRight';

const Bookmarks = () => {
  return (
    <Fragment>
      <Grid container spacing={5}>
        <Grid item lg={8} sm={12}>
          <UserDetailedPageBody sectionTitle={'Bookmarks'}/>
        </Grid>
        <Grid item lg={4} sm={12}>
          <BookmarksSidebarRight/>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Bookmarks;