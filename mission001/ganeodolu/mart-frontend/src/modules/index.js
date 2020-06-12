import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import loading from './loading';
import products, { productsSaga } from './products';
import write, { writeSaga } from './write';
import product, { productSaga } from './product';

const rootReducer = combineReducers({
  loading,
  products,
  write,
  product,
});

export function* rootSaga() {
  yield all([productsSaga(), writeSaga(), productSaga()]);
}

export default rootReducer;
