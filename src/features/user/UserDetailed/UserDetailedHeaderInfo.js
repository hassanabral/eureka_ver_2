import React from 'react';
import Typography from '@material-ui/core/Typography';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import LinkIcon from '@material-ui/icons/Link';
import TodayIcon from '@material-ui/icons/Today';
import { makeStyles } from '@material-ui/core/styles';
import { Link, Box } from '@material-ui/core';

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

const UserDetailedHeaderInfo = ({ theme, location, website}) => {
  const classes = useStyles(theme);

  return (
    <div className={classes.root}>
      {<Box component='span' mr={2.5}>
        <Typography variant="body2" display="inline"
                    gutterBottom={true}>
          <LocationOnOutlinedIcon color="action" className={classes.icon}
                                  fontSize='small'/>
          {location}
        </Typography>
      </Box>}
      {<Box component='span' mr={2.5}>

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
          Joined 3 months ago
        </Typography>
      </Box>
    </div>
  );
};

export default UserDetailedHeaderInfo;