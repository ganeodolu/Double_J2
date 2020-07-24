import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as searchAPI from '../lib/api/search';
import { takeLatest } from 'redux-saga/effects';

const [
  SEARCH_PRODUCTS,
  SEARCH_PRODUCTS_SUCCESS,
  SEARCH_PRODUCTS_FAILURE,
] = createRequestActionTypes('search/SEARCH_PRODUCTS');

export const searchProducts = createAction(
  SEARCH_PRODUCTS,
  ({ query, page, size }) => ({
    query,
    page,
    size,
  }),
);

const searchProductsSaga = createRequestSaga(
  SEARCH_PRODUCTS,
  searchAPI.searchProducts,
);

export function* searchSaga() {
  yield takeLatest(SEARCH_PRODUCTS, searchProductsSaga);
}

const initialState = {
  products: null,
  error: null,
};

const search = handleActions(
  {
    [SEARCH_PRODUCTS_SUCCESS]: (state, { payload: products }) => ({
      ...state,
      products,
    }),
    [SEARCH_PRODUCTS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default search;
