import React from 'react';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import Link from '@mui/material/Link';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ShareIcon from '@mui/icons-material/Share';
import Box from '@mui/material/Box';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
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

const UserDetailedBodyInfo = () => {
  const classes = useStyles();

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