import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { Home, Auth } from 'pages';
import HeaderContainer from 'containers/Base/HeaderContainer';
import storage from 'lib/storage';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'redux/modules/user';

function App() {
  const dispatch = useDispatch();
  const UserActions = bindActionCreators(userActions, dispatch);

  const initializeUserInfo = async () => {
    const loggedInfo = storage.get('loggedInfo');
    if(!loggedInfo) return;

    UserActions.setLoggedInfo(loggedInfo);
    try {
      await UserActions.checkStatus();
    } catch(e) {
      storage.remove('loggedInfo');
      window.location.href = '/auth/login?expired';
    }
  }

  useEffect(() => {
    initializeUserInfo();
  }, []);

  return (
    <div>
      <HeaderContainer/>
      <Route exact path="/" component={Home} />
      <Route path="/auth" component={Auth} />
    </div>
  );
}

export default App;
