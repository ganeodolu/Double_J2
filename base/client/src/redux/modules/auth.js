import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import * as AuthAPI from 'lib/api/auth';
import createRequestSaga, { createRequestActionTypes } from 'lib/createRequestSaga';

const CHANGE_INPUT = 'auth/CHANGE_INPUT'
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM'
const [
  CHECK_EMAIL_EXISTS, 
  CHECK_EMAIL_EXISTS_SUCCESS, 
  CHECK_EMAIL_EXISTS_FAILURE
] = createRequestActionTypes('auth/CHECK_EMAIL_EXISTS')
const [
  CHECK_USERNAME_EXISTS, 
  CHECK_USERNAME_EXISTS_SUCCESS, 
  CHECK_USERNAME_EXISTS_FAILURE
] = createRequestActionTypes('auth/CHECK_USERNAME_EXISTS')
const [
  LOCAL_REGISTER, 
  LOCAL_REGISTER_SUCCESS, 
  LOCAL_REGISTER_FAILURE
] = createRequestActionTypes('auth/LOCAL_REGISTER')
const [
  LOCAL_LOGIN, 
  LOCAL_LOGIN_SUCCESS, 
  LOCAL_LOGIN_FAILURE
] = createRequestActionTypes('auth/LOCAL_LOGIN')
const LOGOUT = 'auth/LOGOUT'
const SET_ERROR = 'auth/SET_ERROR';

export const changeInput = createAction(CHANGE_INPUT);
export const initializeForm = createAction(INITIALIZE_FORM);
export const checkEmailExists = createAction(CHECK_EMAIL_EXISTS, email => email);
export const checkUsernameExists = createAction(CHECK_USERNAME_EXISTS, username => username);
export const localRegister = createAction(LOCAL_REGISTER, obj => obj);
export const localLogin = createAction(LOCAL_LOGIN, obj => obj);
export const logout = createAction(LOGOUT);
export const setError = createAction(SET_ERROR);

const checkEmailExistsSaga = createRequestSaga(CHECK_EMAIL_EXISTS, AuthAPI.checkEmailExists)
const checkUsernameExistsSaga = createRequestSaga(CHECK_USERNAME_EXISTS, AuthAPI.checkUsernameExists)
const localRegisterSaga = createRequestSaga(LOCAL_REGISTER, AuthAPI.localRegister)
const localLoginSaga = createRequestSaga(LOCAL_LOGIN, AuthAPI.localLogin)

function* logoutSaga(action) {
  yield call(AuthAPI.logout, action.payload);
}

const initialState = {
  register: {
    form: {
      email: '',
      username: '',
      password: '',
      passwordConfirm: ''
    },
    exists: {
      email: false,
      username: false
    },
    error: null
  },
  login: {
    form: {
      email: '',
      password: ''
    },
    error: null
  },
  result: {}
};

export function* authSaga() {
  yield takeEvery(CHECK_EMAIL_EXISTS, checkEmailExistsSaga);
  yield takeEvery(CHECK_USERNAME_EXISTS, checkUsernameExistsSaga);
  yield takeEvery(LOCAL_REGISTER, localRegisterSaga);
  yield takeEvery(LOCAL_LOGIN, localLoginSaga);
  yield takeEvery(LOGOUT, logoutSaga);
}

export default handleActions({
  [CHANGE_INPUT] : (state, action) => {
    const { form, name, value } = action.payload;
    return produce(state, draft => {
      draft[form].form[name] = value
    })
  },
  [INITIALIZE_FORM]: (state, action) => {
    const initialForm = initialState[action.payload];
    return produce(state, draft => {
      draft[action.payload] = initialForm
    })
  },
  [CHECK_EMAIL_EXISTS_SUCCESS]: (state, action) => {
    return produce(state, draft => {
      draft.register.exists.email = action.payload.data.exists
    })
  },
  [CHECK_USERNAME_EXISTS_SUCCESS]: (state, action) => {
    return produce(state, draft => {
      draft.register.exists.username = action.payload.data.exists
    })
  },
  [LOCAL_REGISTER_SUCCESS]: (state, action) => {
    return produce(state, draft => {
      draft.result = action.payload.data
    })
  },
  [LOCAL_LOGIN_SUCCESS]: (state, action) => {
    return produce(state, draft => {
      draft.result = action.payload.data
    })
  },
  [SET_ERROR]: (state, action) => {
    const { form, message } = action.payload;
    return produce(state, draft => {
      draft[form].error = message
    })
  }
}, initialState)