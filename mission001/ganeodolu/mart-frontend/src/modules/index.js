import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import loading from './loading';
import products, { productsSaga } from './products';
import create, { createSaga } from './create';
import product, { productSaga } from './product';

const rootReducer = combineReducers({
  loading,
  products,
  create,
  product,
});

export function* rootSaga() {
  yield all([productsSaga(), createSaga(), productSaga()]);
}

export default rootReducer;
