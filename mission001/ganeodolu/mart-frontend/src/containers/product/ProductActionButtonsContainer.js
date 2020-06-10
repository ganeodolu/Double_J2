import React from 'react';
import ProductActionButtons from '../../components/product/ProductActionButtons';
import { useSelector, useDispatch } from 'react-redux';
import { removeProduct } from '../../lib/api/products';
import { withRouter } from 'react-router-dom';

const ProductActionButtonsContainer = ({ history, _id }) => {
  const onRemove = async () => {
    try {
      await removeProduct(_id);
      history.go()
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <ProductActionButtons onRemove={onRemove} />
      {/* <ProductActionButtons onEdit={onEdit} onRemove={onRemove} /> */}
    </div>
  );
};

export default withRouter(ProductActionButtonsContainer);
