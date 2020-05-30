import React, {Fragment} from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import red from '@material-ui/core/colors/red';
import { useFirebase } from "react-redux-firebase";
import { useHistory } from "react-router-dom";
import { Container } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import bgImage from './darkblueBg.jpg';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    color: '#fff',
    backgroundImage: `url(${bgImage})`,
    width: '100%',
    height: '100vh'
  },
  container: {
    position: 'fixed',
    top: '30%',
    left: '50%',
    /* bring your own prefixes */
    transform: 'translate(-50%, -50%)'
  },
  button: {
    borderColor: red[300],
    color: red[500],
    '&:hover': {
      backgroundColor: '#fff'
    }
}

}));

const Landing = ({ theme }) => {
  const firebase = useFirebase();

  const signInWithGoogle = () => {
    firebase
      .login({
        provider: "google",
        type: "popup",
      })
      .then(() => {
        history.push("/feed");
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithGoogle();
  }

  const history = useHistory();

  const classes = useStyles(theme);

  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <Box mb={3}>
          <Typography variant='h2'><strong>Eureka 2.0</strong></Typography>
        </Box>
        <Typography variant='h6' paragraph>Connect with your friends and share your story.</Typography>
        <Box mt={3}>
          <Button variant='outlined' className={classes.button} size="large" onClick={handleLogin}>Login with Google</Button>
        </Box>
      </Container>
    </div>

  )
};

export default Landing;