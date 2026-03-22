import React, {Fragment} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  box: {
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(15),
      marginTop: theme.spacing(10)
    },
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(25),
      marginTop: theme.spacing(10)
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: theme.spacing(55),
      marginTop: theme.spacing(10)
    },
  }
}));

const Spinner = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <Box className={classes.box}>
        <CircularProgress size={100}/>
        <Box mt={1} ml={2}>
          <Typography variant='body1'>Loading...</Typography>
        </Box>
      </Box>
    </Fragment>
  );
};

export default Spinner;