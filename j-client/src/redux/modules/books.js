import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { pender } from 'redux-pender';
import * as BooksAPI from 'lib/api/books';

const GET_BOOKS_LIST = 'book/GET_BOOKS_LIST';
const ADD_BOOK = 'book/ADD_BOOK';
const UPDATE_STOCK = 'book/UPDATE_STOCK';

export const getBooksList = createAction(GET_BOOKS_LIST, BooksAPI.getBooksList);
export const addBook = createAction(ADD_BOOK, BooksAPI.addBook);
export const updateStock = createAction(UPDATE_STOCK, BooksAPI.updateStock);

const initialState = Map({
  data: null
})

export default handleActions({
  ...pender({
    type: GET_BOOKS_LIST,
    onSuccess: (state, action) => state.set('data', action.payload.data)
  })
}, initialState)