import {
  FETCH_ALL,
  LIKE_POST,
  DELETE,
  UPDATE,
  CREATE,
  UPDATING,
} from '../constants/actionTypes';

export default (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...posts, action.payload];
    case UPDATE:
    case LIKE_POST:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case DELETE:
      return posts.filter((post) => post._id !== action.payload);
    case UPDATING:
      return posts.map((post) =>
        post._id === action.payload._id ? { ...post, isLoading: true } : post
      );
    default:
      return posts;
  }
};
