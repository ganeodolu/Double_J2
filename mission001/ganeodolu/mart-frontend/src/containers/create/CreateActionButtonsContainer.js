import React, { useEffect } from 'react';
import CreateActionButtons from '../../components/create/CreateActionButtons';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createProduct } from '../../modules/create';

const CreateActionButtonsContainer = ({ history }) => {
  const dispatch = useDispatch();
  const { productId, productName, price, quantity } = useSelector(
    ({ create }) => ({
      productId: create.productId,
      productName: create.productName,
      price: create.price,
      quantity: create.quantity,
      product: create.product,
      productError: create.productError,
    }),
  );
  const onCreate = () => {
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

  // useEffect(() => {
  //   if(product){
  //     const { _id, } = product
  //     history.push(`/`)
  //   }
  //   if(productError){
  //     console.log(productError)
  //   }

  // }, [history, product, productError])

  return (
    <CreateActionButtons
      onCreate={onCreate}
      onCancel={onCancel}
    ></CreateActionButtons>
  );
};

export default withRouter(CreateActionButtonsContainer);
