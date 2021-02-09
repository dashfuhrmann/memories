import React, { useState, useEffect } from 'react';
import { Modal } from '@material-ui/core';
import { useSelector } from 'react-redux';
import useStyles from './styles';
import { TextField, Button, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { registerUser } from '../../actions/auth';
import { useDispatch } from 'react-redux';
import { clearErrors } from '../../actions/errors';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const RegisterModal = () => {
  const [modalData, setModalData] = useState({
    modal: false,
    name: '',
    email: '',
    password: '',
    msg: null,
  });

  const [showPassword, setShowPassword] = useState(false);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const error = useSelector((state) => state.error);

  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error.id === 'REGISTER_FAIL') {
      setModalData({ ...modalData, msg: error.msg.message });
    } else {
      setModalData({ ...modalData, msg: null });
    }
  }, [error]);

  useEffect(() => {
    if (modalData.modal) {
      if (isAuthenticated) {
        handleClose();
      }
    }
  }, [isAuthenticated]);

  const [modalStyle] = useState(getModalStyle);

  const handleOpen = () => {
    dispatch(clearErrors());
    setModalData({
      modal: true,
      name: '',
      email: '',
      password: '',
      msg: null,
    });
  };

  const handleClose = () => {
    dispatch(clearErrors());
    setModalData({
      modal: false,
      name: '',
      email: '',
      password: '',
      msg: null,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, password } = modalData;

    const newUser = {
      name,
      email,
      password,
    };

    dispatch(registerUser(newUser));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <Button color="inherit" className={classes.register} onClick={handleOpen}>
        Register
      </Button>
      <Modal open={modalData.modal} onClose={handleClose}>
        <div style={modalStyle} className={classes.paper}>
          <form
            className={`${classes.root} ${classes.form}`}
            autoComplete="off"
            noValidate
            onSubmit={handleSubmit}
          >
            <div className={classes.alertContainer}>
              <Typography variant="h6">Register</Typography>
              {modalData.msg ? (
                <Alert severity="error">{modalData.msg}</Alert>
              ) : null}
            </div>

            <TextField
              name="name"
              variant="outlined"
              label="Name"
              fullWidth
              onChange={(e) => {
                setModalData({ ...modalData, name: e.target.value });
              }}
            ></TextField>
            <TextField
              name="email"
              variant="outlined"
              label="Email"
              fullWidth
              onChange={(e) => {
                setModalData({ ...modalData, email: e.target.value });
              }}
            ></TextField>
            <TextField
              name="Password"
              variant="outlined"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={(e) => {
                setModalData({ ...modalData, password: e.target.value });
              }}
            ></TextField>
            <Button
              className={classes.buttonSubmit}
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              fullWidth
            >
              Submit
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default RegisterModal;
