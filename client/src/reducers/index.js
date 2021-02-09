import { combineReducers } from 'redux';

import posts from './posts';
import auth from './auth';
import error from './errors';
import postState from './postState';
import pagination from './pagination';

export default combineReducers({
  posts,
  auth,
  error,
  postState,
  pagination,
});
