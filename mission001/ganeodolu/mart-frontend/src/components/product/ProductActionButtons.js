import React from 'react';

const ProductActionButtons = ({ onEdit, onRemove }) => {
  return (
    <div>
      <button onClick={onEdit}>물품수정</button>
      <button onClick={onRemove}>물품삭제</button>
    </div>
  );
};

export default ProductActionButtons;
