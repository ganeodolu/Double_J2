import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as productsAPI from '../lib/api/products';
import { takeLatest } from 'redux-saga/effects';

const [
  LIST_PRODUCTS,
  LIST_PRODUCTS_SUCCESS,
  LIST_PRODUCTS_FAILURE,
] = createRequestActionTypes('products/LIST_PRODUCTS');

export const listProducts = createAction(LIST_PRODUCTS, ({ page }) => ({
  page,
}));

const listProductsSaga = createRequestSaga(
  LIST_PRODUCTS,
  productsAPI.listProducts,
);

export function* productsSaga() {
  yield takeLatest(LIST_PRODUCTS, listProductsSaga);
}

const initialState = {
  products: null,
  error: null,
};

const products = handleActions(
  {
    [LIST_PRODUCTS_SUCCESS]: (state, { payload: products }) => ({
      ...state,
      products,
    }),
    [LIST_PRODUCTS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default products;
