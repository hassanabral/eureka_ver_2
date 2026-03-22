import React from 'react';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import Box from '@mui/material/Box';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import bgImage from './darkblueBg.jpg';
import { useSelector } from 'react-redux';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Button from '@mui/material/Button';

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
    borderColor: '#fff',
    fontWeight: 'bold',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#fff',
      color: '#333'
    }
  }

}));

const Landing = () => {
  const navigate = useNavigate();
  const auth = useSelector((state: any) => state.auth);
  if (auth.isLoaded && auth.authenticated) {
    navigate('/feed');
  }

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <Box mb={3}>
          <Typography variant='h2'><strong>Eureka 2.0</strong></Typography>
        </Box>
        <Typography variant='h6' paragraph>Connect with your friends and share your
          story.</Typography>
        <Box mt={3}>
          <Button
            variant='outlined'
            className={classes.button}
            size="large"
            component={RouterLink} to="/feed"
          >
            Get Started
            <ArrowForwardIcon/>
          </Button>
        </Box>
      </Container>
    </div>

  );
};

export default Landing;
