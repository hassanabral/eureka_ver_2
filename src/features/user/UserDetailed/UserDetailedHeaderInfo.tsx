import React from 'react';
import Typography from '@mui/material/Typography';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LinkIcon from '@mui/icons-material/Link';
import TodayIcon from '@mui/icons-material/Today';
import makeStyles from '@mui/styles/makeStyles';
import { Link, Box } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';

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

const UserDetailedHeaderInfo = ({ location, website, createdAt }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {location && <Box component='span' mr={2.5}>
        <Typography variant="body2" display="inline"
                    gutterBottom={true}>
          <LocationOnOutlinedIcon color="action" className={classes.icon}
                                  fontSize='small'/>
          {location}
        </Typography>
      </Box>}
      {website && <Box component='span' mr={2.5}>

       <Typography variant="body2" display="inline"
                    gutterBottom={true}>
          <Link href={`http://${website}`} target='_blank'>
            <LinkIcon color="action" className={classes.icon} fontSize='small'/>
            {website}
          </Link>
        </Typography>
      </Box>}
      <Box component='span' mr={2.5}>
        <Typography variant="body2" display="inline"
                    gutterBottom={true}>
          <TodayIcon color="action" className={classes.icon} fontSize='small'/>
          Joined {formatDistanceToNow(createdAt.toDate(), { addSuffix: true })}
        </Typography>
      </Box>
    </div>
  );
};

export default UserDetailedHeaderInfo;