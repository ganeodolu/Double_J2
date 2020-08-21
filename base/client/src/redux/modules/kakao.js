import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import * as KakaoAPI from 'lib/api/kakao';
import createRequestSaga, { createRequestActionTypes } from 'lib/createRequestSaga';

const CHANGE_INPUT = 'kakao/CHANGE_INPUT'
const [
  SEARCH_KAKAO_BOOKS,
  SEARCH_KAKAO_BOOKS_SUCCESS,
  SEARCH_KAKAO_BOOKS_FAILURE
] = createRequestActionTypes('kakao/SEARCH_KAKAO_BOOKS');

export const changeInput = createAction(CHANGE_INPUT);
export const searchKakaoBooks = createAction(SEARCH_KAKAO_BOOKS, text => text);

const searchKakaoBooksSaga = createRequestSaga(SEARCH_KAKAO_BOOKS, KakaoAPI.searchKakaoBooks);

const initialState = {
  text: '',
  isEnd: null,
  pageableCount: null,
  totalCount: null,
  data: null
};

export function* kakaoSaga() {
  yield takeEvery(SEARCH_KAKAO_BOOKS, searchKakaoBooksSaga);
}

export default handleActions({
  [CHANGE_INPUT]: (state, action) => {
    const { value } = action.payload;
    return produce(state, draft => {
      draft.text = value
    });
  },
  [SEARCH_KAKAO_BOOKS_SUCCESS]: (state, action) => {
    const {
      meta: { is_end, pageable_count, total_count },
      documents
    } = action.payload.data;
    const books = (documents && documents.length) && documents.filter(({ thumbnail }) => !!thumbnail)
    console.log('SEARCHED BOOKS', books)
    return produce(state, draft => {
      draft.isEnd = is_end;
      draft.pageableCount = pageable_count;
      draft.totalCount = total_count;
      draft.data = books;
    })
  }
}, initialState)