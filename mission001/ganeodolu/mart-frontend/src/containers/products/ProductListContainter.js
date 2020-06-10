import React, { useEffect } from 'react';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProductList from '../../components/products/ProductList';
import { listProducts } from '../../modules/products';

const ProductListContainer = ({ location, history }) => {
  const dispatch = useDispatch();
  const { products, error, loading } = useSelector(({ products, loading }) => ({
    products: products.products,
    error: products.error,
    loading: loading['products/LIST_PRODUCTS'],
  }));
  const onClickProduct = (id) => {
    history.push(`/products/${id}`)
  }

  useEffect(() => {
    const { page } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    dispatch(listProducts({ page }));
  }, [dispatch, location.search]);

  return <ProductList products={products} loading={loading} error={error} onClickProduct={onClickProduct} />;
};

export default withRouter(ProductListContainer);
