import {
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADING,
  USER_LOADED,
} from '../constants/actionTypes';
import * as api from '../api';
import { returnErrors } from './errors';

export const getUser = () => async (dispach, getState) => {
  dispach({ type: USER_LOADING });

  api
    .getUser(tokenConfig(getState))
    .then((res) => {
      dispach({ type: USER_LOADED, payload: res.data });
    })
    .catch((err) => {
      dispach(returnErrors(err.response.data, err.response.status));

      dispach({ type: AUTH_ERROR });
    });
};

export const tokenConfig = (getState) => {
  const token = getState().auth.token;

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};

export const registerUser = ({ name, email, password }) => (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, password });

  api
    .registerUser(config, body)
    .then((res) => dispatch({ type: REGISTER_SUCCESS, payload: res.data }))
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
      );

      dispatch({ type: REGISTER_FAIL });
    });
};

export const loginUser = ({ email, password }) => (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  api
    .loginUser(config, body)
    .then((res) => dispatch({ type: LOGIN_SUCCESS, payload: res.data }))
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
      );

      dispatch({ type: LOGIN_FAIL });
    });
};

export const logoutUser = () => {
  return { type: LOGOUT_SUCCESS };
};
