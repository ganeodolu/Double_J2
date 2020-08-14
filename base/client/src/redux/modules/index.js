import { combineReducers } from 'redux';
import base from './base';
import auth, { authSaga } from './auth';
import user, { userSaga } from './user';
import { all, fork } from 'redux-saga/effects';

export function* rootSaga() {
  yield all([authSaga(), userSaga()]);
  // yield all([fork(authSaga), fork(userSaga)]);
}

export default combineReducers({
  base,
  auth,
  user
});