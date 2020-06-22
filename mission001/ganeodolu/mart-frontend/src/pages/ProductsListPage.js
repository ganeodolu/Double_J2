import React from 'react';
import ProductListContainer from '../containers/products/ProductListContainter';
import Responsive from '../components/common/Responsive';
import HeaderContainer from '../containers/common/HeaderContainer';

const ProductsListPage = () => {
  return (
    <Responsive>
      <HeaderContainer />
      <ProductListContainer />
    </Responsive>
  );
};

export default ProductsListPage;
