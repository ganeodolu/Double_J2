import React from 'react';
import ProductListContainer from '../containers/products/ProductListContainter';
import Responsive from '../components/common/Responsive';

const ProductsListPage = () => {
  return (
    <Responsive>
      <ProductListContainer />
    </Responsive>
  );
};

export default ProductsListPage;
