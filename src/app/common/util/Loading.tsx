import React, { Fragment } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center'
    }
}));

const Loading = ({ loading }) => {
  const classes = useStyles();
  return (
    <Fragment>
      {loading && <Box className={classes.root}>
        <CircularProgress/>
      </Box>}
    </Fragment>
  );
};

export default Loading;