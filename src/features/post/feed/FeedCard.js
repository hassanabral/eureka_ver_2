import React, {Fragment} from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link'
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import FeedCardButtons from './FeedCardButtons';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  profile: {
    width: theme.spacing(6),
    height: theme.spacing(6)
  },
  cardIdeasPage: {
    padding: theme.spacing(3),
  },
  cardUserPage: {
    padding: theme.spacing(2, 1),
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(0),
      paddingRight: theme.spacing(0),
    },
  },

}));

const FeedCard = ({theme, elevateCard = true, marginY = 2, dividerBottom = false}) => {
  const classes = useStyles(theme);

  return (
    <Fragment>
      <Box my={marginY}>
        <Card className={!elevateCard ? classes.cardUserPage : classes.cardIdeasPage} variant={!elevateCard ? '' : 'outlined'} elevation={elevateCard ? 1 : 0}>
          <Grid container className={classes.root} spacing={1}>
            <Grid item xs={12} style={{paddingBottom: 0}}>
              <Box style={{display: 'flex', justifyContent: 'space-between'}}>
                <Box component='span'>
                  <Link variant='h6' color="secondary" component={RouterLink} to={`/posts/1`}>How to train pokemon?</Link>
                </Box>
                  <Box>
                    <IconButton  component={RouterLink}
                                 to={`/posts/edit/1`}
                                 aria-label="edit"
                                 color='primary'>
                      <EditIcon fontSize="medium" />
                    </IconButton>
                      <IconButton aria-label="delete"
                                  style={{ color: '#ba1818' }}>
                        <DeleteIcon fontSize="medium"/>
                      </IconButton>
                  </Box>
              </Box>
            </Grid>
            <Grid item sm={2.5}>
              <Box mt={0.5}>
                <Link component={RouterLink} to={`/users/1`}>
                  <Avatar alt='John Doe'
                          src=''/>
                </Link>
              </Box>


            </Grid>
            <Grid item sm={6}>
              <Box mt={0.5}>
                <Link variant='body2' color="secondary" component={RouterLink} to={`/users/1`}>John Doe</Link>
              </Box>
              <Box mt={0.5}>
                <Typography variant="body2" style={{color: '#757575'}}>
                  Written 3 months ago
                </Typography>
              </Box>
            </Grid>
            <Grid item md={12}>
              <Typography variant="body1" paragraph={true}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A animi cum eius exercitationem fugit, magnam magni maiores maxime nemo odit pariatur quia quod repellat repudiandae sit vel velit voluptate voluptatem...
               <Link variant='body1' component={RouterLink} to={`/posts/1`}>(more)</Link>
              </Typography>
              <FeedCardButtons/>
            </Grid>
          </Grid>
        </Card>
      </Box>
      {dividerBottom ? <Divider/> : null}
    </Fragment>
  );
};

export default FeedCard;