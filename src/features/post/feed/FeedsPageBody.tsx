import React, { Fragment } from 'react';
import FeedCard from './FeedCard';
import InfiniteScroll from 'react-infinite-scroller';

const FeedsPageBody = ({ feeds, loading, moreFeeds, getNextFeeds }) => {

  return (
    <Fragment>
      {
        feeds && feeds.length !== 0 &&
        <InfiniteScroll
          pageStart={0}
          loadMore={getNextFeeds}
          hasMore={!loading && moreFeeds}
          initialLoad={false}
        >
          {feeds && feeds.map(feed => (<FeedCard key={feed.id} post={feed}/>))}
       </InfiniteScroll>
      }
    </Fragment>
  );
};

export default FeedsPageBody;