import { SET_CREATE, SET_EDIT, RESET } from '../constants/actionTypes';

const initalState = {
  create: false,
  edit: false,
};

export default (state = initalState, action) => {
  switch (action.type) {
    case SET_CREATE:
      return {
        edit: false,
        create: true,
      };
    case SET_EDIT:
      return {
        create: false,
        edit: true,
      };
    case RESET:
      return initalState;
    default:
      return state;
  }
};
