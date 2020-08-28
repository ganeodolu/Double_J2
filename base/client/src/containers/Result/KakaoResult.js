import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { InfoWrapper, KakaoContents, BookWrapper } from 'components/Result/Kakao';
import { bindActionCreators } from 'redux';
import * as kakaoActions from 'redux/modules/kakao';

function KakaoResult() {
  const { text, endPage, pageableCount, totalCount, data } = useSelector(state => ({
    text: state.kakao.text,
    endPage: state.kakao.endPage,
    pageableCount: state.kakao.pageableCount,
    totalCount: state.kakao.totalCount,
    data: state.kakao.data
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

  return (
    <>
      <InfoWrapper text={text} totalCount={totalCount} onChange={onChangeSize}>
        {
          sizes.map((size, idx) => (
            <option key={idx} value={size}>{size}개</option>
          ))
        }
      </InfoWrapper>
      <KakaoContents >
        {
          data && data.map((book, idx) => (
            <BookWrapper key={idx} book={book}>

            </BookWrapper>
          ))
        }
      </KakaoContents>
      <p>{pageableCount}</p>
    </>
  )

}

export default KakaoResult;