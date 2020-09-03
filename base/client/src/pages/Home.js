import React from 'react';
import { Route } from 'react-router-dom';
import { BaseWrapper } from 'components/Base';
import Main from 'containers/Base/Main'

function Home() {
  return (
    <BaseWrapper>
      <Route path="/" component={Main}/>
    </BaseWrapper>
  );
}

export default Home;