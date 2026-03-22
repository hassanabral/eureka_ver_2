import React, { Fragment, useEffect, useRef, useCallback } from 'react';
import FeedCard from './FeedCard';

const FeedsPageBody = ({ feeds, loading, moreFeeds, getNextFeeds }: any) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && moreFeeds) {
          getNextFeeds();
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [loading, moreFeeds, getNextFeeds]
  );

  return (
    <Fragment>
      {feeds && feeds.length !== 0 && (
        <>
          {feeds.map((feed: any) => (
            <FeedCard key={feed.id} post={feed} />
          ))}
          <div ref={sentinelRef} style={{ height: 1 }} />
        </>
      )}
    </Fragment>
  );
};

export default FeedsPageBody;
