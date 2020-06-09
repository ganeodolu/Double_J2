import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as productsAPI from '../lib/api/products';
import { takeLatest } from 'redux-saga/effects';

const INITIALIZE = 'create/INITIALIZE';
const CHANGE_FIELD = 'create/CHANGE_FIELD';

const [
  CREATE_PRODUCT,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,
] = createRequestActionTypes('create/CREATE_PRODUCT');

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));

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

export function* createSaga() {
  yield takeLatest(CREATE_PRODUCT, createProductSaga);
}

const initialState = {
  productId: '',
  productName: '',
  price: '',
  quantity: '',
  product: null,
  productError: null,
};

const create = handleActions(
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
  },
  initialState,
);

export default create;
