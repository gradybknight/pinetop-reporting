import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Posts from './Posts'
import PostForm from './PostForm'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

function PaperSheet(props) {
  const { classes } = props;

  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="headline" component="h3">
          Pot Still Server Interaction Summary
        </Typography>
        <Typography component="p">
          Requests made to server: 
          <br/>
          GET /potStillGraphData --> array of id, timestamp, temperature, elapsedTime (in seconds)
          <br/>
          GET /potStillStatus --> isRunning (boolean)
          <br/>
          POST /startPotStill (userName) --> isRunning (boolean) (return true on confirmation that run started)
          <br/>
          POST /stopPotStill (userName) --> isRunning (boolean) (return false on confirmation that run started)
        </Typography> 
        
        <PostForm />
        <Posts />
      </Paper>
    </div>
  );
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSheet);
