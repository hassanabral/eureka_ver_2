import React, { Fragment, useState } from 'react';
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
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import PostDetailedReplyForm from './PostDetailedReplyForm';
import PostDetailedReplies from './PostDetailedReplies';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';

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
    paddingBottom: 0
  }
}));

const PostDetailedComment = ({ theme, comment }) => {

  const [toggleReplies, setToggleReplies] = useState(false);
  const [toggleReplyForm, setToggleReplyForm] = useState(false);

  const buttonColor = 'gray';

  const classes = useStyles(theme);

  return (
    <Fragment>
      <Box mb={2}>
        <Card className={classes.card}>
          <Box mb={0} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box mb={0} component='span'>
              <Chip
                avatar={<Avatar alt={comment.authorName}
                                src={comment.authorPhotoURL}/>}
                label={comment.authorName}
                clickable
                color="primary"
                component={RouterLink}
                to={`/users/${comment.authorId}`}
              />
              <Box ml={1} component='span'>
                <Typography variant="body2" style={{ color: '#757575' }} paragraph={true}
                            display='inline'>
                  Posted {comment?.date && moment(comment.date.toDate()).fromNow()}
                </Typography>
              </Box>

            </Box>
            {
              <Box component='span' mb={0} pb={0}>
                <IconButton className={classes.button} aria-label="delete" style={{ color: '#ba1818' }}>
                  <DeleteIcon fontSize="medium"/>
                </IconButton>
              </Box>
            }

          </Box>


          <Typography variant='body1' paragraph={true}>
            {ReactHtmlParser(comment.commentBody)}
          </Typography>

          <Box mb={1}>
            <Box mb={0} mr={2} component='span'>
              <Typography mb={0} variant="body2" display="inline" gutterBottom={true}>
                <Link mb={0} className={classes.button}
                      style={{ color: `${buttonColor}` }}>
                  <FavoriteIcon style={{ color: `${buttonColor}` }}
                                className={classes.icon} fontSize='small'/>
                  {comment.likeCount}
                </Link>
              </Typography>
            </Box>
            <Box component='span'>
              <Button
                onClick={() => setToggleReplyForm(!toggleReplyForm)}
                disableRipple={true}
                className={classes.button}
                color='secondary'
                size="medium">Reply</Button>
            </Box>
          </Box>
          {toggleReplyForm &&
          <PostDetailedReplyForm setToggleReplyForm={setToggleReplyForm} commentId={comment.id}/>}
          <Box mb={0}>
            <Button className={classes.button}
                    onClick={() => setToggleReplies(!toggleReplies)}
                    variant='text'
                    color='primary'
                    disableRipple={true}
                    disableElevation={true}
                    disableFocusRipple={true}
                    startIcon={toggleReplies ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>}>
              {toggleReplies ? 'Hide' : 'View'} {comment.commentCount} replies
            </Button>
          </Box>
          {toggleReplies && <PostDetailedReplies commentId={comment.id}/>}
        </Card>
      </Box>
    </Fragment>

  );
};

export default PostDetailedComment;
