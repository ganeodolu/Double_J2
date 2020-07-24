import React from 'react';
import Responsive from '../components/common/Responsive';
import HeaderContainer from '../containers/common/HeaderContainer';
import SearchFormContainer from '../containers/search/SearchFormContainer';

const SearchProductsPage = () => {
  return (
    <Responsive>
      <HeaderContainer />
      <SearchFormContainer/>
    </Responsive>
  )
}

export default SearchProductsPage