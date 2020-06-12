import React, { useEffect, useCallback } from 'react';
import WriteForm from '../../components/write/WriteForm';
import { useSelector, useDispatch } from 'react-redux';
import { changeField, initialize } from '../../modules/write';

const WriteFormContainer = () => {
  const dispatch = useDispatch();
  const { productId, productName, price, quantity } = useSelector(
    ({ write }) => ({
      productId: write.productId,
      productName: write.productName,
      price: write.price,
      quantity: write.quantity,
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
      <WriteForm
        onChangeField={onChangeField}
        productId={productId}
        productName={productName}
        price={price}
        quantity={quantity}
      />
    </div>
  );
};

export default WriteFormContainer;
