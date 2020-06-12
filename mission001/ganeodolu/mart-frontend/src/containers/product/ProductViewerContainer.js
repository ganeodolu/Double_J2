import React, { useEffect } from 'react';
import ProductViewer from '../../components/product/ProductViewer';
import { useDispatch, useSelector } from 'react-redux';
import { readProduct, unloadProduct } from '../../modules/product';
import { withRouter } from 'react-router-dom';
// import { setOriginalProduct } from '../../modules/write';

const ProductViewerContainer = ({ match, history }) => {
  console.log(match);
  const { _id } = match.params;
  console.log(_id);
  const dispatch = useDispatch();
  const { product, error, loading } = useSelector(({ product, loading }) => ({
    product: product.product,
    error: product.error,
    loading: loading['product/READ_PRODUCT'],
  }));

  useEffect(() => {
    dispatch(readProduct(_id));
    return () => {
      dispatch(unloadProduct());
    };
  }, [dispatch, _id]);

  // const onEdit = () => {
  //   dispatch(setOriginalProduct(product))
  //   history.push('/create');
  // };

  return (
    <div>
      <ProductViewer product={product} loading={loading} error={error} />
    </div>
  );
};

export default withRouter(ProductViewerContainer);
