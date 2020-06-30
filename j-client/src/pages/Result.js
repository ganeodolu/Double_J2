import React from 'react';
import { Route } from 'react-router-dom';
import { ResultWrapper } from 'components/Result';
import { Kakao } from 'containers/Result';

function Result() {
  return (
    <ResultWrapper>
      <Route path="/result/kakao" component={Kakao} />
    </ResultWrapper>
  );
};

export default Result;