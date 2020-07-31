import React from 'react';
import { Route } from 'react-router-dom';
import { ResultWrapper } from 'components/Result';
import { Kakao, Stock } from 'containers/Result';

function Result() {
  return (
    <ResultWrapper>
      <Route exact path="/result/kakao" component={Kakao} />
      <Route path="/result/" component={Stock} />
    </ResultWrapper>
  );
};

export default Result;