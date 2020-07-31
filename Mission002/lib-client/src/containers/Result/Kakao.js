import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { InfoWrapper, BookWrapper, ResultContents, AddButton, ReadBookButton, BookMarkButton, CollectionBookButton } from 'components/Result';
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

  const handleAddDB = async (book, str) => {
    book.type = str;
    try {
      if(user.get('logged')){
        console.log(book)
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
    <>
      <InfoWrapper text={text} totalCount={totalCount} />
      <ResultContents>
        {data && data.map((book, idx) => (
          <BookWrapper 
            key={idx} 
            book={book}
          >
            <ReadBookButton onClick={() => handleAddDB(book, "Read")}/>
            <BookMarkButton onClick={() => handleAddDB(book, "Bookmark")}/>
            <CollectionBookButton onClick={() => handleAddDB(book, "Collection")}/>
          </BookWrapper>
        ))}
      </ResultContents>
    </>
  )
};

export default Kakao;