import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestore } from 'react-redux-firebase';
import { getTags } from '../postActions';

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
  },
  divider: {
    marginTop: theme.spacing(2),
  },
  tag: {
    margin: theme.spacing(0.5),
    borderRadius: theme.spacing(3),
    textTransform: 'lowercase'
  }
}));

// retrieves the list of tags from the tags collection with useEffect
// when a user clicks on a tag, we use "setSelectedTag" then fetch the posts
// related to that tag
const TagsList = ({ theme, setSelectedTag }) => {
  const classes = useStyles(theme);
  const tags = useSelector(state => state.post.tags);
  const firestore = useFirestore();
  const dispatch = useDispatch();

  useEffect( () => {
    const handleGetTags = async () => {
      await dispatch(getTags(firestore));
    }
    // only get tags from backend if "tags" is null
    if(!tags) {
      handleGetTags();
    }
  }, [firestore, dispatch, tags]);

  return (
    <Box my={2}>
      {
        tags && tags.map(tag =>
          <Button
            key={tag.name}
            onClick={() => setSelectedTag(tag.name)}
            disableElevation variant='contained' size='small' color='primary' className={classes.tag}>
            #{tag.name}
          </Button>
        )
      }
    </Box>
  );
};

export default TagsList;