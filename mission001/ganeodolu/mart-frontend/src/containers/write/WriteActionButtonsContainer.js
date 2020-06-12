import React, { useEffect } from 'react';
import WriteActionButtons from '../../components/write/WriteActionButtons';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createProduct, updateProduct } from '../../modules/write';

const WriteActionButtonsContainer = ({ history }) => {
  const dispatch = useDispatch();
  const {
    productId,
    productName,
    price,
    quantity,
    product,
    productError,
    originalProductId,
  } = useSelector(({ write }) => ({
    productId: write.productId,
    productName: write.productName,
    price: write.price,
    quantity: write.quantity,
    product: write.product,
    productError: write.productError,
    originalProductId: write.originalProductId,
  }));
  const onCreate = () => {
    if (originalProductId) {
      dispatch(
        updateProduct({
          productId,
          productName,
          price,
          quantity,
          id: originalProductId,
        }),
      );
      return;
    }
    dispatch(
      createProduct({
        productId,
        productName,
        price,
        quantity,
      }),
    );
  };
  const onCancel = () => {
    history.goBack();
  };

  useEffect(() => {
    if(product){
      const { _id, } = product
      history.push(`/products/${_id}`)
    }
    if(productError){
      console.log(productError)
    }

  }, [history, product, productError])

  return (
    <WriteActionButtons
      onCreate={onCreate}
      onCancel={onCancel}
      isEdit={!!originalProductId}
    ></WriteActionButtons>
  );
};

export default withRouter(WriteActionButtonsContainer);
