import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ShareIcon from '@material-ui/icons/Share';
import Box from '@material-ui/core/Box';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1.5),
  },
  icon: {
    marginBottom: '-4px',
    marginRight: '4px'
  }
}));

const UserDetailedBodyInfo = ({theme}) => {
  const classes = useStyles(theme);

  return (
    <div className={classes.root}>
      <Box component='span' mr={2.5}>
        <Typography variant="body2" display="inline" gutterBottom={true}>
          <Link href="#" color="secondary">
            <ThumbUpOutlinedIcon color="action" className={classes.icon} fontSize='small'/>
            15
          </Link>
        </Typography>
      </Box>
      <Box component='span' mr={2.5}>
        <Typography variant="body2" display="inline" gutterBottom={true}>
          <Link href="#" color="secondary">
            <ShareIcon color="action" className={classes.icon} fontSize='small'/>
            6
          </Link>
        </Typography>
      </Box>
      <Box component='span' mr={2.5}>
        <Typography variant="body2" display="inline" gutterBottom={true}>
          <Link component={RouterLink} to='/ideas/1'  color="secondary">
            <ChatBubbleOutlineIcon color="action" className={classes.icon} fontSize='small'/>
            8
          </Link>
        </Typography>
      </Box>
    </div>
  );
};

export default UserDetailedBodyInfo;