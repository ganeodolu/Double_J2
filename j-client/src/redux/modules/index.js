import { combineReducers } from 'redux';
import base from './base';
import auth from './auth';
import user from './user';
import kakao from './kakao';
import { penderReducer } from 'redux-pender';

export default combineReducers({
  base,
  auth,
  user,
  kakao,
  pender: penderReducer
});