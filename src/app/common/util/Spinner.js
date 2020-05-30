import React, {Fragment} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  box: {
    [theme.breakpoints.down('xs')]: {
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

const Spinner = ({theme}) => {
  const classes = useStyles(theme);

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