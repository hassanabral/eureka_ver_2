import React, {Fragment} from 'react';
import FeedCard from './FeedCard';

const FeedsPageBody = ({feeds}) => {

  return (
    <Fragment>
      {
        feeds.length > 0 && feeds.map(feed => <FeedCard key={feed.id} post={feed}/>)
      }
    </Fragment>
  );
};

export default FeedsPageBody;