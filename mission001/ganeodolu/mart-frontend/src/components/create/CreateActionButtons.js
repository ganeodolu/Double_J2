import React from 'react';



const CreateActionButtons = ({onCreate, onCancel}) => {
  return (
    <div>
      <button onClick={onCreate}>
        물품등록
      </button>
      <button onClick={onCancel}>
        취소
      </button>
    </div>
  )
}

export default CreateActionButtons
