import React, { Fragment } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center'
    }
}));

const Loading = ({ theme, loading }) => {
  const classes = useStyles(theme);
  return (
    <Fragment>
      {loading && <Box className={classes.root}>
        <CircularProgress/>
      </Box>}
    </Fragment>
  );
};

export default Loading;