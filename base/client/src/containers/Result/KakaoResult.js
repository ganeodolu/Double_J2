import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { InfoWrapper, KakaoContents, BookWrapper, Pagination } from 'components/Result/Kakao';
import { bindActionCreators } from 'redux';
import * as kakaoActions from 'redux/modules/kakao';

function KakaoResult() {
  const { text, page, endPage, pageableCount, totalCount, data, size } = useSelector(state => ({
    text: state.kakao.text,
    page: state.kakao.page,
    endPage: state.kakao.endPage,
    pageableCount: state.kakao.pageableCount,
    totalCount: state.kakao.totalCount,
    data: state.kakao.data,
    size: state.kakao.size
  }));
  const sizes = [10, 20, 40];
  const dispatch = useDispatch();
  const KakaoActions = bindActionCreators(kakaoActions, dispatch);

  const onChangeSize = async (e) => {
    const value = e.target.value;
    if(text){
      try {
        await KakaoActions.changeSize({ form: 'size', value })
        await KakaoActions.searchKakaoBooks({text, page: 1, size: value});
      } catch (e) {
        console.log(e)
      }
    }
  }

  const onChangePage = async (e) => {
    const value = e.target.value;
    if(text){
      try {
        await KakaoActions.changePage({ value: Number(value) })
        await KakaoActions.searchKakaoBooks({text, page: value, size});
      } catch (e) {
        console.log(e)
      }
    }
  }

  return (
    <>
      <InfoWrapper text={text} pageableCount={pageableCount} onChange={onChangeSize}>
        {
          sizes.map((size, idx) => (
            <option key={idx} value={size}>{size}개</option>
          ))
        }
      </InfoWrapper>
      <KakaoContents>
        {
          data && data.map((book, idx) => (
            <BookWrapper key={idx} book={book} idx={idx}>

            </BookWrapper>
          ))
        }
      </KakaoContents>
      <Pagination
        page={page}
        endPage={endPage}
        onChangePage={onChangePage}
        ></Pagination>
      <p>{pageableCount}</p>
    </>
  )

}

export default KakaoResult;
