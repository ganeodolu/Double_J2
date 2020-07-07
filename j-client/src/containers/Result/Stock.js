import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BookWrapper, ResultContents, StockNumber, StockCounterButton, StockOrderButton } from 'components/Result';
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
    console.log('asdasd')
    stock += number;
    console.log('발주: ', { id, stock })
    try {
      await BooksActions.updateStock({ id, stock });
      await BooksActions.getBooksList();
      setNumber(0);
    } catch (e) {
      console.log('ERROR: ', e)
    }
  }

  return (
    <>
      <StockCounterButton onIncrease={onIncrease} onDecrease={onDecrease} number={number} onChange={onChange} />
      <StockOrderButton onClick={handleUpdateStock}/>
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