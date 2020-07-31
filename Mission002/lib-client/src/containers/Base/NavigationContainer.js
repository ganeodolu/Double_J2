import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as booksActions from 'redux/modules/books';
import NavigationBar from 'components/Base/Navigation';

function NavigationContainer() {
  const { visible } = useSelector(state => ({
    visible: state.base.getIn(['header', 'visible'])
  }));
  
  const dispatch = useDispatch();
  const BooksActions = bindActionCreators(booksActions, dispatch);

  if(!visible) return null;

  const handleStockList = async () => {
    try {
      await BooksActions.getBooksList();
    } catch (e) {
      console.log(e)
    }
  }

  const handleTypeList = async () => {
    try {
      await BooksActions.getTypeBooksList();
    } catch (e) {
      console.log(e)
    }
  }


  return (
    <NavigationBar onClickList={handleStockList} onClickTypeList={handleTypeList}/>
  );
}

export default NavigationContainer;