import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import * as AuthAPI from 'lib/api/auth';
import createRequestSaga, { createRequestActionTypes } from 'lib/createRequestSaga';

const SET_LOGGED_INFO = 'user/SET_LOGGED_INFO';
const SET_VALIDATED = 'user/SET_VALIDATED';
const LOGOUT = 'user/LOGOUT';
const [
  CHECK_STATUS, 
  CHECK_STATUS_SUCCESS, 
  CHECK_STATUS_FAILURE
] = createRequestActionTypes('user/CHECK_STATUS')

export const setLoggedInfo = createAction(SET_LOGGED_INFO);
export const setValidated = createAction(SET_VALIDATED);
export const logout = createAction(LOGOUT);
export const checkStatus = createAction(CHECK_STATUS);

const logoutSaga = createRequestSaga(LOGOUT, AuthAPI.logout)
const checkStatusSaga = createRequestSaga(CHECK_STATUS, AuthAPI.checkStatus)

const initialState = {
  loggedInfo: {
    thumbnail: null,
    username: null
  },
  logged: false,
  validated: false
};

export function* userSaga() {
  yield takeEvery(LOGOUT, logoutSaga);
  yield takeEvery(CHECK_STATUS, checkStatusSaga);
}

export default handleActions({
  [SET_LOGGED_INFO]: (state, action) => {
    return produce(state, draft => {
      draft.loggedInfo = action.payload;
      draft.logged = true;
    })
  },
  [SET_VALIDATED]: (state, action) => {
    return produce(state, draft => {
      draft.validated = action.payload
    })
  },
  [CHECK_STATUS_SUCCESS]: (state, action) => {
    return produce(state, draft => {
      draft.loggedInfo = action.payload.data
    })
  },
  [CHECK_STATUS_FAILURE]: (state, action) => {
    return produce(state, draft => {
      draft = initialState
    })
  }
}, initialState)
