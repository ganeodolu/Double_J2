import React from 'react';
import { Route } from 'react-router-dom';
import { KakaoResult } from 'containers/Result';
import { BookDetail } from 'components/Detail';
import { BaseWrapper } from 'components/Base';

function Searched() {
  return (
    <BaseWrapper>
      <Route path="/search/kakao" exact={true} component={KakaoResult} />
      <Route path="/search/kakao/detail/:bookIndex" component={BookDetail} />
    </BaseWrapper>
  );
}

export default Searched;