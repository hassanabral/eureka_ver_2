import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import { Link } from '@material-ui/core';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    padding: theme.spacing(3, 5),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3),
    }
  },
  icon: {
    marginBottom: '-4px',
    marginRight: '4px'
  },
  button: {
    padding: 2,
    backgroundColor: 'transparent'
  }
}));

const PostDetailedReply = ({ theme, reply }) => {

  const buttonColor = 'gray';

  const classes = useStyles(theme);
  return (
    <Fragment>
      <Box mb={2}>
          <Box style={{display: 'flex', justifyContent: 'space-between'}}>
            <Box mb={2} component='span'>
              <Chip
                avatar={  <Avatar alt={reply.authorName}
                                  src={reply.authorPhotoURL}/>}
                label={reply.authorName}
                clickable
                color="primary"
                component={RouterLink}
                to={`/users/${reply.authorId}`}
              />
              <Box ml={1} component='span'>
                <Typography variant="body2" style={{color: '#757575'}} paragraph={true} display='inline'>
                  Posted {reply?.date && moment(reply.date.toDate()).fromNow()}
                </Typography>
              </Box>

            </Box>
            {
              <Box component='span'>
                <IconButton aria-label="delete" style={{color: '#ba1818'}}>
                  <DeleteIcon fontSize="medium" />
                </IconButton>
              </Box>
            }

          </Box>


          <Typography variant='body1' paragraph={true}>{reply.commentBody}</Typography>

          <Box mb={1}>
            <Box mb={0} mr={2} component='span'>
              <Typography mb={0} variant="body2" display="inline" gutterBottom={true}>
                <Link mb={0} className={classes.button}  style={{color: `${buttonColor}`}}>
                  <FavoriteIcon style={{color: `${buttonColor}`}} className={classes.icon} fontSize='small'/>
                  {reply.likeCount}
                </Link>
              </Typography>
            </Box>
            <Box component='span'>
              <Button className={classes.button} color='secondary' size="medium">Reply</Button>
            </Box>
          </Box>
          <Box mb={0}>
            <Button className={classes.button} color='primary' startIcon={ <ArrowDropDownIcon />}>
              View replies
            </Button>
          </Box>
      </Box>
    </Fragment>

  )
};

export default PostDetailedReply;
