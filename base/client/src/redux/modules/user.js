import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import * as AuthAPI from 'lib/api/auth';

const SET_LOGGED_INFO = 'user/SET_LOGGED_INFO';
const SET_VALIDATED = 'user/SET_VALIDATED';
const LOGOUT = 'user/LOGOUT';

const CHECK_STATUS = 'user/CHECK_STATUS';
const CHECK_STATUS_SUCCESS = 'user/CHECK_STATUS_SUCCESS';
const CHECK_STATUS_FAILURE = 'user/CHECK_STATUS_FAILURE';

export const setLoggedInfo = createAction(SET_LOGGED_INFO);
export const setValidated = createAction(SET_VALIDATED);
export const logout = createAction(LOGOUT);
export const checkStatus = createAction(CHECK_STATUS);

function* logoutSaga(action) {
  yield call(AuthAPI.logout, action.payload);
}

function* checkStatusSaga(action) {
  try {
    const response = yield call(AuthAPI.checkStatus, action.payload);
    yield put({ type: CHECK_STATUS_SUCCESS, payload: response });
  } catch (e) {
    yield put({ type: CHECK_STATUS_FAILURE, payload: e});
  }
}

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
    return initialState;
  }
}, initialState)
