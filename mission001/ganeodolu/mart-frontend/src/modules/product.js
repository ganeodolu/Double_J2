import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as productsAPI from '../lib/api/products';
import { takeLatest } from 'redux-saga/effects';

const [
  READ_PRODUCT,
  READ_PRODUCT_SUCCESS,
  READ_PRODUCT_FAILURE,
] = createRequestActionTypes('product/READ_PRODUCT');
const UNLOAD_PRODUCT = 'product/UNLOAD_PRODUCT';

export const readProduct = createAction(READ_PRODUCT, (id) => id);
export const unloadProduct = createAction(UNLOAD_PRODUCT);

const readProductSaga = createRequestSaga(
  READ_PRODUCT,
  productsAPI.readProduct,
);

export function* productSaga() {
  yield takeLatest(READ_PRODUCT, readProductSaga);
}

const initialState = {
  product: null,
  error: null,
};

const product = handleActions(
  {
    [READ_PRODUCT_SUCCESS]: (state, { payload: product }) => ({
      ...state,
      product,
    }),
    [READ_PRODUCT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UNLOAD_PRODUCT]: () => initialState,
  },
  initialState,
);

export default product;
