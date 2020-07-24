import React, { useEffect } from 'react';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchProducts } from '../../modules/search';
import SearchForm from '../../components/search/SearchForm';

const SearchFormContainer = ({ location }) => {
  const dispatch = useDispatch();
  const { products, error, loading } = useSelector(({ search, loading }) => ({
    products: search.products,
    error: search.error,
    loading: loading['search/SEARCH_PRODUCTS'],
  }));

  useEffect(() => {
    const { query, page, size } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    console.log(query)
    dispatch(searchProducts({ query, page, size }));
  }, [dispatch, location.search]);

  return products && (<SearchForm products={products} error={error} loading={loading} />);
};

export default withRouter(SearchFormContainer);
