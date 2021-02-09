import {
  FETCH_ALL,
  LIKE_POST,
  DELETE,
  UPDATE,
  CREATE,
  UPDATING,
  SET_PAGINATION,
  CREATE_POST_FAIL,
  RESET,
} from '../constants/actionTypes';
import * as api from '../api';
import { tokenConfig } from './auth';
import { returnErrors } from './errors';

export const getPosts = (page, searchterm) => async (dispatch) => {
  api
    .fetchPosts(page, searchterm)
    .then((res) => {
      dispatch({ type: FETCH_ALL, payload: res.data.posts });
      dispatch({ type: SET_PAGINATION, payload: res.data.metadata });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.status, err.response.data));
    });
};

export const createPost = (post) => async (dispatch, getState) => {
  api
    .createPost(post, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: CREATE, payload: res.data });
      dispatch({ type: RESET });
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'CREATE_POST_FAIL')
      );

      dispatch({ type: CREATE_POST_FAIL });
    });
};

export const updatePost = (id, post) => async (dispatch, getState) => {
  dispatch({ type: UPDATING, payload: post });

  api
    .updatePost(id, post, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: UPDATE, payload: res.data });
      dispatch({ type: RESET });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const deletePost = (id) => async (dispatch, getState) => {
  api
    .deletePost(id, tokenConfig(getState))
    .then(() => {
      dispatch({ type: DELETE, payload: id });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const likePost = (id, userId, option) => async (dispatch, getState) => {
  api
    .likePost(id, userId, option, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: LIKE_POST, payload: res.data });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
