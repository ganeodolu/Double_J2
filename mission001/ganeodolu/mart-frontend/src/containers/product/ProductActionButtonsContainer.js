import React from 'react';
import ProductActionButtons from '../../components/product/ProductActionButtons';
import { useSelector, useDispatch } from 'react-redux';
import { removeProduct, updateProduct } from '../../lib/api/products';
import { withRouter } from 'react-router-dom';
import { setOriginalProduct } from '../../modules/write';

const ProductActionButtonsContainer = ({ history, _id }) => {
  const dispatch = useDispatch();

  const { product } = useSelector(({ product }) => ({
    product: product.product,
  }));

  const onEdit = () => {
    dispatch(setOriginalProduct(product))
    history.push('/create');
  };

  const onRemove = async () => {
    try {
      await removeProduct(_id);
      history.push('/products');
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <ProductActionButtons onEdit={onEdit} onRemove={onRemove} />
    </div>
  );
};

export default withRouter(ProductActionButtonsContainer);
