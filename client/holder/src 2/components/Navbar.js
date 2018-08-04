import axios from 'axios';
import React from 'react';
import { withRouter } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';

import LoginMenu from './LoginMenu';


import { update } from '../services/withUser';
import LoginButtonRevised from './LoginButtonRevised';

const Navbar = (props) => {
  const { user } = props;
  const username = user ? user.fullName : null;
  const handleLogIn = () => {
    props.history.push('/login');
  };
  const handleLogOut = () => {
    axios.delete('/api/auth')
      .then(() => {
        // unsets the currently logged in user. all components wrapped in withUser
        // will be updated with a null user and rerender accordingly
        update(null);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <AppBar
      title="Pinetop Production Managment"
      showMenuIconButton={false}
      iconElementRight={user ?
        <LoginMenu username={username} onLogOut={handleLogOut} />
        : <LoginButtonRevised onClick={handleLogIn} />}
    />
  )
};

export default withRouter(Navbar);
