import { combineReducers } from 'redux';
import base from './base';
import auth from './auth';
import user from './user';
import kakao from './kakao';
import books from './books';
import { penderReducer } from 'redux-pender';

export default combineReducers({
  base,
  auth,
  user,
  kakao,
  books,
  pender: penderReducer
});