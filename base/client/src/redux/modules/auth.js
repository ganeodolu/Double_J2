import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import * as AuthAPI from 'lib/api/auth';
import createRequestSaga, { createRequestActionTypes } from 'lib/createRequestSaga';

// const CHANGE_INPUT = 'auth/CHANGE_INPUT'
// const INITIALIZE_FORM = 'auth/INITIALIZE_FORM'

// const CHECK_EMAIL_EXISTS = 'auth/CHECK_EMAIL_EXISTS';
// const CHECK_EMAIL_EXISTS_SUCCESS = 'auth/CHECK_EMAIL_EXISTS_SUCCESS';
// const CHECK_EMAIL_EXISTS_FAILURE = 'auth/CHECK_EMAIL_EXISTS_FAILURE';
const [
  CHECK_EMAIL_EXISTS, 
  CHECK_EMAIL_EXISTS_SUCCESS, 
  CHECK_EMAIL_EXISTS_FAILURE
] = createRequestActionTypes('auth/CHECK_EMAIL_EXISTS')

// const CHECK_USERNAME_EXISTS = 'auth/CHECK_USERNAME_EXISTS';
// const CHECK_USERNAME_EXISTS_SUCCESS = 'auth/CHECK_USERNAME_EXISTS_SUCCESS';
// const CHECK_USERNAME_EXISTS_FAILURE = 'auth/CHECK_USERNAME_EXISTS_FAILURE';
const [
  CHECK_USERNAME_EXISTS, 
  CHECK_USERNAME_EXISTS_SUCCESS, 
  CHECK_USERNAME_EXISTS_FAILURE
] = createRequestActionTypes('auth/CHECK_USERNAME_EXISTS')

const LOCAL_REGISTER = 'auth/LOCAL_REGISTER';
const LOCAL_REGISTER_SUCCESS = 'auth/LOCAL_REGISTER_SUCCESS';
const LOCAL_REGISTER_FAILURE = 'auth/LOCAL_REGISTER_FAILURE';

const LOCAL_LOGIN = 'auth/LOCAL_LOGIN';
const LOCAL_LOGIN_SUCCESS = 'auth/LOCAL_LOGIN_SUCCESS';
const LOCAL_LOGIN_FAILURE = 'auth/LOCAL_LOGIN_FAILURE';

const LOGOUT = 'auth/LOGOUT';

const SET_ERROR = 'auth/SET_ERROR';

// export const changeInput = createAction(CHANGE_INPUT);
// export const initializeForm = createAction(INITIALIZE_FORM);
export const checkEmailExists = createAction(CHECK_EMAIL_EXISTS, email => email);
export const checkUsernameExists = createAction(CHECK_USERNAME_EXISTS, username => username);
export const localRegister = createAction(LOCAL_REGISTER, obj => obj);
export const localLogin = createAction(LOCAL_LOGIN, obj => obj);
export const logout = createAction(LOGOUT);
export const setError = createAction(SET_ERROR);

// function* checkEmailExistsSaga(action) {
//   try {
//     const response = yield call(AuthAPI.checkEmailExists, action.payload);
//     yield put({ type: CHECK_EMAIL_EXISTS_SUCCESS, payload: response });
//   } catch (e) {
//     yield put({ type: CHECK_EMAIL_EXISTS_FAILURE, payload: e});
//   }
// }
const checkEmailExistsSaga = createRequestSaga(CHECK_EMAIL_EXISTS, AuthAPI.checkEmailExists)

// function* checkUsernameExistsSaga(action) {
//   try {
//     const response = yield call(AuthAPI.checkUsernameExists, action.payload);
//     yield put({ type: CHECK_USERNAME_EXISTS_SUCCESS, payload: response });
//   } catch (e) {
//     yield put({ type: CHECK_USERNAME_EXISTS_FAILURE, payload: e});
//   }
// }
const checkUsernameExistsSaga = createRequestSaga(CHECK_USERNAME_EXISTS, AuthAPI.checkUsernameExists)

function* localRegisterSaga(action) {
  try {
    const response = yield call(AuthAPI.localRegister, action.payload);
    yield put({ type: LOCAL_REGISTER_SUCCESS, payload: response });
  } catch (e) {
    yield put({ type: LOCAL_REGISTER_FAILURE, payload: e});
  }
}

function* localLoginSaga(action) {
  try {
    const response = yield call(AuthAPI.localLogin, action.payload);
    yield put({ type: LOCAL_LOGIN_SUCCESS, payload: response });
  } catch (e) {
    yield put({ type: LOCAL_LOGIN_FAILURE, payload: e});
  }
}

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
  // [CHANGE_INPUT] : (state, action) => {
  //   // const { form, name, value } = action.payload;
  //   // return state.setIn([form, 'form', name], value);
  //   const { form, values } = action.payload;
  //   return produce(state, draft => {
  //     draft[form].form = values
  //   })
  // },
  // [INITIALIZE_FORM]: (state, action) => {
  //   const initialForm = initialState.get(action.payload);
  //   return state.set(action.payload, initialForm);
  // },
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
    // return state.setIn([form, 'error'], message);
    return produce(state, draft => {
      draft[form].error = message
    })
  }
  // [LOGOUT_SUCCESS]: (state, action) => {
  //   return produce(state, draft => {
  //     draft.
  //   })
  // },
  // ...pender({
  //   type: CHECK_EMAIL_EXISTS,
  //   onSuccess: (state, action) => state.setIn(['register', 'exists', 'email'], action.payload.data.exists)
  // }),
  // ...pender({
  //   type: CHECK_USERNAME_EXISTS,
  //   onSuccess: (state, action) => state.setIn(['register', 'exists', 'username'], action.payload.data.exists)
  // }),
  // ...pender({
  //   type: LOCAL_LOGIN,
  //   onSuccess: (state, action) => state.set('result', Map(action.payload.data))
  // }),
  // ...pender({
  //   type: LOCAL_REGISTER,
  //   onSuccess: (state, action) => state.set('result', Map(action.payload.data))
  // }),
  // [SET_ERROR]: (state, action) => {
  //   const { form, message } = action.payload;
  //   return state.setIn([form, 'error'], message);
  // }
}, initialState)