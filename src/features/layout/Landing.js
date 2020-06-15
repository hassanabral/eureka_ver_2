import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import red from '@material-ui/core/colors/red';
import { isEmpty, isLoaded, useFirebase, useFirestore } from 'react-redux-firebase';
import { useHistory } from 'react-router-dom';
import { Container } from '@material-ui/core';
import bgImage from './darkblueBg.jpg';
import { useSelector } from 'react-redux';

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
  const history = useHistory();
  const firebase = useFirebase();
  const firestore = useFirestore();
  const auth = useSelector(state => state.firebase.auth);
  if (isLoaded(auth) && !isEmpty(auth)) {
    history.push('/feed');
  }

  const signInWithGoogle = async () => {
    const user = await firebase.login({ provider: "google", type: "popup"});
    if (user.additionalUserInfo.isNewUser) {
      await firebase.updateProfile({
        createdAt: firestore.FieldValue.serverTimestamp(),
      })
    }
    return user;
  };

  const handleLogin = async () => {
    await signInWithGoogle();
  }


  const classes = useStyles(theme);

  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <Box mb={3}>
          <Typography variant='h2'><strong>Eureka 2.0</strong></Typography>
        </Box>
        <Typography variant='h6' paragraph>Connect with your friends and share your story.</Typography>
        <Box mt={3}>
          <Button variant='outlined' className={classes.button} size="large" onClick={() => handleLogin()}>Login with Google</Button>
        </Box>
      </Container>
    </div>

  )
};

export default Landing;