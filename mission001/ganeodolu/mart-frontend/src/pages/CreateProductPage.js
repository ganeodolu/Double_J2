import React from 'react';
import Responsive from '../components/common/Responsive';
import CreateFormContainer from '../containers/create/CreateFormContainer';
import CreateActionButtonsContainer from '../containers/create/CreateActionButtonsContainer';

const CreateProductPage = () => {
  return (
    <Responsive>
      <CreateFormContainer />
      <CreateActionButtonsContainer />
    </Responsive>
  );
};

export default CreateProductPage;
