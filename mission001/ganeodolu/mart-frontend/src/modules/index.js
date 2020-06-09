import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import loading from './loading';
import products, { productsSaga } from './products';
import create, { createSaga } from './create';

const rootReducer = combineReducers({
  loading,
  products,
  create,
});

export function* rootSaga() {
  yield all([productsSaga(), createSaga()]);
}

export default rootReducer;
