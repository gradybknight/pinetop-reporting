// import React from 'react';
// import FlatButton from 'material-ui/FlatButton';

// const LoginButton = (props) => (
//   <FlatButton label="Log In" onClick={props.onClick} />
// );

// export default LoginButton;

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

function LoginButtonRevised(props) {
  const { classes } = props;
  return (
    <div>
      <Button 
        variant="raised" 
        className={classes.button} 
        onClick={props.onClick} 
        disableRipple={true}
        color='primary'
      >
        Log In
      </Button>
    </div>
  );
}

// ContainedButtons.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(LoginButtonRevised);