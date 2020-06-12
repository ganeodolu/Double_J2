import React from 'react';
import Responsive from '../components/common/Responsive';
import WriteFormContainer from '../containers/write/WriteFormContainer';
import WriteActionButtonsContainer from '../containers/write/WriteActionButtonsContainer';

const WriteProductPage = () => {
  return (
    <Responsive>
      <WriteFormContainer />
      <WriteActionButtonsContainer />
    </Responsive>
  );
};

export default WriteProductPage;
