import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import loading from './loading';
import products, { productsSaga } from './products';

const rootReducer = combineReducers({
  loading,
  products,
});

export function* rootSaga() {
  yield all([productsSaga()]);
}

export default rootReducer;
