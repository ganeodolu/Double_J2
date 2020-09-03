import React from 'react';
import { Route } from 'react-router-dom';
import { KakaoResult } from 'containers/Result';
import { BaseWrapper } from 'components/Base';

function Searched() {
  return (
    <BaseWrapper>
      <Route path="/search/kakao" component={KakaoResult} />
    </BaseWrapper>
  );
}

export default Searched;