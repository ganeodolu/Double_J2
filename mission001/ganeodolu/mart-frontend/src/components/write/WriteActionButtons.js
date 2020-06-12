import React from 'react';

const WriteActionButtons = ({ onCreate, onCancel, isEdit }) => {
  return (
    <div>
      <button onClick={onCreate}>물품{isEdit ? '수정': '등록'}</button>
      <button onClick={onCancel}>취소</button>
    </div>
  );
};

export default WriteActionButtons;
