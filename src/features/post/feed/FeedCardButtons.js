import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link'
import { Link as RouterLink, withRouter } from 'react-router-dom';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import { Box } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  icon: {
    marginBottom: '-4px',
    marginRight: '4px'
  },
  button: {
    cursor: 'pointer'
  }
}));

const FeedCardButtons = ({theme}) => {
  const classes = useStyles(theme);
  const buttonColor = 'action';

  return (
    <Box mb={1} mt={1.5}>
      <Box mr={2.5} component={'span'}>
        <Typography variant="body2" display="inline" gutterBottom={true} >
          <Link className={classes.button} color={buttonColor}>
            <ThumbUpOutlinedIcon color={buttonColor} className={classes.icon} fontSize='small'/>
            4
          </Link>
        </Typography>
      </Box>
      <Box mr={2.5} component={'span'}>
        <Typography variant="body2" display="inline" gutterBottom={true}>
          <Link component={RouterLink} to={`/posts/1`} color="secondary">
            <ChatBubbleOutlineIcon color="action" className={classes.icon} fontSize='small'/>
            4
          </Link>
        </Typography>
      </Box>
    </Box>

  );
};

export default FeedCardButtons;
