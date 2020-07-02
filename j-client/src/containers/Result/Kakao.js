import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { InfoWrapper, KakaoWrapper } from 'components/Result';
import * as booksActions from 'redux/modules/books';


function Kakao() {
  const { text, totalCount, data, user } = useSelector(state => ({
    text: state.kakao.get('text'),
    totalCount: state.kakao.get('totalCount'),
    data: state.kakao.get('data'),
    user: state.user
  }))
  
  const dispatch = useDispatch();
  const BooksActions = bindActionCreators(booksActions, dispatch);

  const handleAddDB = async (book) => {
    console.log(book)
    try {
      if(user.get('logged')){
        await BooksActions.addBook(book)
        alert('성공하였습니다.')
      } else {
        alert('로그인을 하세요.')
      }
    } catch (e) {
      console.log('ERROR: ', e)
    }
  }

  return (
    <InfoWrapper text={text} totalCount={totalCount}>
      {data && data.map((book, idx) => (
        <KakaoWrapper 
          key={idx} 
          thumbnail={book.thumbnail} 
          title={book.title} 
          authors={book.authors}
          publisher={book.publisher} 
          datetime={book.datetime}
          url={book.url}
          onClick={() => handleAddDB(book)}
         />
      ))}
    </InfoWrapper>
  )
};

export default Kakao;