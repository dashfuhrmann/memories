import { SET_CREATE, SET_EDIT, RESET } from '../constants/actionTypes';

export const setCreate = () => {
  return { type: SET_CREATE };
};

export const setEdit = () => {
  return { type: SET_EDIT };
};

export const reset = () => {
  return { type: RESET };
};
