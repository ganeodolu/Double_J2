import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import loading from './loading';
import products, { productsSaga } from './products';
import write, { writeSaga } from './write';
import product, { productSaga } from './product';
import auth, { authSaga } from './auth';
import user, { userSaga } from './user';
import search, { searchSaga } from './search';

const rootReducer = combineReducers({
  user,
  auth,
  loading,
  products,
  write,
  product,
  search,
});

export function* rootSaga() {
  yield all([
    authSaga(),
    userSaga(),
    productsSaga(),
    writeSaga(),
    productSaga(),
    searchSaga(),
  ]);
}

export default rootReducer;
