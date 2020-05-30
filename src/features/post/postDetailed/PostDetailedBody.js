import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import BookmarkIcon from '@material-ui/icons/Bookmark';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  hashtag: {
    padding: theme.spacing(0.5),
    borderRadius: theme.spacing(0.5)
  }

}));

const PostDetailedBody = ({ theme }) => {
  const classes = useStyles(theme);
  return (
    <Fragment>
      <Box mb={3}>
        <Typography variant='h3'>How to train pokemon?</Typography>
      </Box>
      <Box mb={2}>
        <Grid container spacing={2}>
          <Grid item sm={2.5}>
            <Link component={RouterLink} to={`/users/1`}>
              <Avatar alt='John Doe'
                      src=''/>
            </Link>
          </Grid>
          <Box mt={2} ml={1} mr={0} component='span'>
            <Link variant='body1' color="secondary" component={RouterLink}
                  to={`/users/1`}>John Doe</Link>
          </Box>
          <Box mt={2} mx={1} component='span'>
            <Typography display='inline' variant="body1" style={{ color: '#757575' }}>
              Written 3 months ago
            </Typography>
          </Box>
          <Box mt={2} mb={1} ml={2} component='span'>
            <Button
              variant="outlined"
              color="primary"
              size='small'
              startIcon={<BookmarkIcon/>}
            >
              Save
            </Button>
          </Box>
        </Grid>
      </Box>

      <Box mb={2}>
        <Box mr={1} component='span'>
          <Typography display='inline' variant="body2" className={classes.hashtag}
                      style={{ backgroundColor: 'yellow' }}>
            #webdev
          </Typography>
        </Box>

      </Box>

      <Box my={4}>
        <Typography variant='body1' paragraph={true}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aperiam atque commodi dolor dolores eligendi error est expedita harum illum in itaque libero magni nam numquam perferendis possimus recusandae repellat repudiandae saepe sapiente sed sequi similique sint, sit sunt tempora totam vel velit veritatis vitae voluptate voluptates voluptatibus? Non, provident!
        </Typography>
      </Box>

    </Fragment>
  );
};

export default PostDetailedBody;