import { SET_PAGINATION } from '../constants/actionTypes';

const initalState = {
  total: null,
  pages: null,
};

export default (state = initalState, action) => {
  switch (action.type) {
    case SET_PAGINATION:
      return action.payload;
    default:
      return state;
  }
};
