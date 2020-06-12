import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as productsAPI from '../lib/api/products';
import { takeLatest } from 'redux-saga/effects';

const INITIALIZE = 'write/INITIALIZE';
const CHANGE_FIELD = 'write/CHANGE_FIELD';
const SET_ORIGINAL_PRODUCT = 'write/SET_ORIGINAL_POST';

const [
  CREATE_PRODUCT,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,
] = createRequestActionTypes('write/CREATE_PRODUCT');

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));
export const setOriginalProduct = createAction(
  SET_ORIGINAL_PRODUCT,
  (product) => product,
);

export const createProduct = createAction(
  CREATE_PRODUCT,
  ({ productId, productName, price, quantity }) => ({
    productId,
    productName,
    price,
    quantity,
  }),
);
const createProductSaga = createRequestSaga(
  CREATE_PRODUCT,
  productsAPI.createProduct,
);

const [
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
] = createRequestActionTypes('create/UPDATE_PRODUCT');

export const updateProduct = createAction(
  UPDATE_PRODUCT,
  ({ id, productId, productName, price, quantity }) => ({
    id,
    productId,
    productName,
    price,
    quantity,
  }),
);

const updateProductSaga = createRequestSaga(
  UPDATE_PRODUCT,
  productsAPI.updateProduct,
);

export function* writeSaga() {
  yield takeLatest(CREATE_PRODUCT, createProductSaga);
  yield takeLatest(UPDATE_PRODUCT, updateProductSaga);
}

const initialState = {
  productId: '',
  productName: '',
  price: '',
  quantity: '',
  product: null,
  productError: null,
  originalProductId: null,
};

const write = handleActions(
  {
    [INITIALIZE]: (state) => initialState,
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
    [CREATE_PRODUCT]: (state) => ({
      ...state,
      product: null,
      productError: null,
    }),
    [CREATE_PRODUCT_SUCCESS]: (state, { payload: product }) => ({
      ...state,
      product,
    }),
    [CREATE_PRODUCT_FAILURE]: (state, { payload: productError }) => ({
      ...state,
      productError,
    }),
    [UPDATE_PRODUCT_SUCCESS]: (state, { payload: product }) => ({
      ...state,
      product,
    }),
    [UPDATE_PRODUCT_FAILURE]: (state, { payload: productError }) => ({
      ...state,
      productError,
    }),
    [SET_ORIGINAL_PRODUCT]: (state, { payload: product }) => ({
      ...state,
      productId: product.productId,
      productName: product.productName,
      price: product.price,
      quantity: product.quantity,
      originalProductId: product._id,
    }),
  },
  initialState,
);

export default write;
