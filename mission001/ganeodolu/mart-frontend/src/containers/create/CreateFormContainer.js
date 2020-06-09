import React, { useEffect, useCallback } from 'react';
import CreateForm from '../../components/create/CreateForm';
import { useSelector, useDispatch } from 'react-redux';
import { changeField, initialize } from '../../modules/create';

const CreateFormContainer = () => {
  const dispatch = useDispatch();
  const { productId, productName, price, quantity } = useSelector(
    ({ create }) => ({
      productId: create.productId,
      productName: create.productName,
      price: create.price,
      quantity: create.quantity,
    }),
  );
  const onChangeField = useCallback(
    (payload) => dispatch(changeField(payload)),
    [dispatch],
  );

  useEffect(() => {
    return () => {
      dispatch(initialize());
    };
  }, [dispatch]);
  return (
    <div>
      <CreateForm
        onChangeField={onChangeField}
        productId={productId}
        productName={productName}
        price={price}
        quantity={quantity}
      />
    </div>
  );
};

export default CreateFormContainer;
