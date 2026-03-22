import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getTags } from '../postActions';
import Loading from '../../../app/common/util/Loading';

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
const TagsList = ({ setSelectedTag, selectedTag, loading }) => {
  const classes = useStyles();
  const tags = useSelector((state: any) => state.post.tags);
  const dispatch = useDispatch();

  useEffect( () => {
    const handleGetTags = async () => {
      await dispatch(getTags());
    }
    // only get tags from backend if "tags" is null
    if(!tags) {
      handleGetTags();
    }
  }, [dispatch, tags]);

  return (
    <Box my={2}>
      {
        tags && tags.map(tag =>
          <Button
            key={tag.name}
            variant={tag.name === selectedTag ? 'contained' : 'outlined'}
            onClick={() => setSelectedTag(tag.name)}
            disableElevation
            size='small'
            color='primary'
            className={classes.tag}>
            #{tag.name}
          </Button>
        )
      }
      <Loading loading={loading}/>
    </Box>
  );
};

export default TagsList;
