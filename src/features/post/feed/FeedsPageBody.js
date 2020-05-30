import React, {Fragment} from 'react';
import FeedCard from './FeedCard';

const FeedsPageBody = ({...props}) => {

  return (
    <Fragment>
      <FeedCard/>
      <FeedCard/>
      <FeedCard/>
      <FeedCard/>
    </Fragment>
  );
};

export default FeedsPageBody;