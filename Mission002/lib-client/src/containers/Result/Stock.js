import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BookWrapper, ResultContents, StockNumber, StockCounterButton, StockButton } from 'components/Result';
import * as booksActions from 'redux/modules/books';

function CounterStock({ id, stock }) {
  const [number, setNumber] = useState(0);
  const dispatch = useDispatch();
  const BooksActions = bindActionCreators(booksActions, dispatch);

  const onIncrease = () => {
    setNumber(number + 1);
  };

  const onDecrease = () => {
    number > 0 ? setNumber(number - 1) : alert("발주량이 0 보다 적을 수 없습니다.")
  };

  const onChange = (e) => {
    const value = Number(e.target.value);
    setNumber(value);
  }


  const handleUpdateStock = async () => {
    console.log('발주 Click')
    if(number === 0){
      alert("발주량이 없습니다. 수량을 다시 확인하세요.")
    }
    stock += number;
    console.log('발주: ', { id, stock, number })
    try {
      await BooksActions.updateStock({ id, stock, quantity: number });
      await BooksActions.getBooksList();
      setNumber(0);
    } catch (e) {
      console.log('ERROR: ', e)
    }
  }

  const handleDeleteBook = async () => {
    console.log('제거', { id })
    try {
      await BooksActions.deleteStock({ id });
      await BooksActions.getBooksList();
    } catch (e) {
      console.log('ERROR: ', e)
    }
  }

  return (
    <>
      <StockCounterButton onIncrease={onIncrease} onDecrease={onDecrease} number={number} onChange={onChange} />
      <StockButton onClick={handleUpdateStock} >발주</StockButton>
      <StockButton onClick={handleDeleteBook} >DB에서 제거</StockButton>
    </>
  )
}

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
          <StockNumber>재고: {book.stock}</StockNumber>
          <CounterStock id={book._id} stock={book.stock} />
        </BookWrapper>
      ))}
    </ResultContents>
  )
};

export default Stock;