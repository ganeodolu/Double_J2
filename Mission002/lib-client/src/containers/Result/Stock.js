import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BookWrapper, ResultContents, StockNumber } from 'components/Result';

function Stock() {
  const { data } = useSelector(state => ({
    data: state.books.get('data'),
  }))
  console.log('Stock container: ', data)

  return (
    <ResultContents>
      {data && data.map((book, idx) => (
        <BookWrapper 
          key={idx} 
          book={book}
        >
        </BookWrapper>
      ))}
    </ResultContents>
  )
};

export default Stock;