import React, { useEffect } from 'react';

const CreateForm = ({
  productId,
  productName,
  price,
  quantity,
  onChangeField,
}) => {
  const onChangeInput = (e) => {
    onChangeField({ key: e.target.name, value: e.target.value });
  };

  return (
    <>
      <h2>물품 등록</h2>
      <div>
        <div>
          <label>물품번호</label>
          <input
            placeholder="입력"
            name="productId"
            value={productId}
            onChange={onChangeInput}
          />
        </div>
        <label>물품명</label>
        <input
          placeholder="입력"
          name="productName"
          value={productName}
          onChange={onChangeInput}
        />
      </div>
      <div>
        <label>가격</label>
        <input
          placeholder="입력"
          name="price"
          value={price}
          onChange={onChangeInput}
        />
      </div>
      <div>
        <label>수량</label>
        <input
          placeholder="입력"
          name="quantity"
          value={quantity}
          onChange={onChangeInput}
        />
      </div>
    </>
  );
};

export default CreateForm;
