import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { pender } from 'redux-pender';
import * as KakaoAPI from 'lib/api/kakao';

const CHANGE_INPUT = 'kakao/CHANGE_INPUT'
const SEARCH_KAKAO_BOOKS = 'kakao/SEARCH_KAKAO_BOOKS'

export const changeInput = createAction(CHANGE_INPUT);
export const searchKakaoBooks = createAction(SEARCH_KAKAO_BOOKS, KakaoAPI.searchKakaoBooks);

const initialState = Map({
  text: '',
  isEnd: null,
  pageableCount: null,
  totalCount: null,
  data: null
});

export default handleActions({
  [CHANGE_INPUT] : (state, action) => {
    const { value } = action.payload;
    return state.set('text', value);
  },
  ...pender({
    type: SEARCH_KAKAO_BOOKS,
    onSuccess: (state, action) => {
      const {
        meta: { is_end, pageable_count, total_count },
        documents
      } = action.payload.data;
      const books = (documents && documents.length) && documents.filter(({ thumbnail }) => !!thumbnail)
      console.log('search result books: ', action.payload.data)
      return state.set('isEnd', is_end).set('pageableCount', pageable_count).set('totalCount', total_count).set('data', books)
    }
  })
}, initialState)