import React from 'react';
import { Button } from '@material-ui/core';
import { logoutUser } from '../../actions/auth';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import { reset } from '../../actions/postState';

const LogoutLink = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());

    dispatch(reset());
  };

  return (
    <div>
      <Button color="inherit" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default LogoutLink;
