import React, { Fragment, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { Card, Box } from '@material-ui/core';
import FeedCard from '../../post/feed/FeedCard';
import TagsList from './TagsList';
import { useFirestore } from 'react-redux-firebase';
import { useDispatch, useSelector } from 'react-redux';
import {  getPostsByTag } from '../postActions';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  card: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(5)
  },
  divider: {
    marginTop: theme.spacing(2),
  },
  tagText: {
    // backgroundColor: '#2196F3',
    // color: '#fff',
    backgroundColor: 'yellow',
    padding: theme.spacing(0.5)
  }
}));

const TagsPage = ({ theme }) => {
  const classes = useStyles(theme);
  const [selectedTag, setSelectedTag] = useState(null);

  const postsByTag = useSelector(state => state.post.postsByTag);
  const selectedTagRedux = useSelector(state => state.post.selectedTag);
  const firestore = useFirestore();
  const dispatch = useDispatch();


  useEffect(() => {
    const handleGetPostsByTag = async () => {
      await dispatch(getPostsByTag(firestore, selectedTag));
    }

    if(selectedTag) {
      handleGetPostsByTag();
    }
  }, [selectedTag]);

  return (
    <Fragment>
      <Card className={classes.card}>
        {selectedTagRedux ? <Typography variant='h5'>
          #{selectedTagRedux || selectedTag}
        </Typography> : <Typography variant='h5'>
          Tags
        </Typography>}
        <Box mt={2}>
          <Divider/>
        </Box>
        <Box>
          <TagsList setSelectedTag={setSelectedTag}/>
        </Box>
        <Box mt={2}>
          <Divider/>
        </Box>
        <List className={classes.root}>
          {
            postsByTag?.length > 0 ? postsByTag.map(post =>
              <FeedCard
                key={post.id}
                post={post}
                elevateCard={false}
                marginY={0}
                dividerBottom={true}
              />) : (
              <Box mt={1}>
               <Typography>
                  Click on a <span className={classes.tagText}>#tag</span> to see related posts.
                </Typography>
              </Box>)
          }

        </List>
      </Card>
    </Fragment>
  );
};

export default TagsPage;