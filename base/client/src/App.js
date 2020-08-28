import React from 'react';
import { Route } from 'react-router-dom';
import { Home, Auth, Searched } from 'pages';
import HeaderContainer from 'containers/Base/HeaderContainer';

function App() {
  return (
    <div>
      <HeaderContainer/>
      <Route exact path="/" component={Home}/>
      <Route path="/auth" component={Auth}/>
      <Route path="/search" component={Searched}/>
    </div>
  );
}

export default App;
