import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { Home, Auth, Searched } from 'pages';
import HeaderContainer from 'containers/Base/HeaderContainer';
import storage from 'lib/storage';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import * as userActions from 'redux/modules/user';

function App({ location }) {
  const dispatch = useDispatch();
  const UserActions = bindActionCreators(userActions, dispatch);

  const initializeUserInfo = async () => {
    const loggedInfo = storage.get('loggedInfo'); // 로그인 정보를 로컬스토리지에서 가져옵니다.
    if(!loggedInfo) return; // 로그인 정보가 없다면 여기서 멈춥니다.

    UserActions.setLoggedInfo(loggedInfo);
    try {
        await UserActions.checkStatus();
    } catch (e) {
        storage.remove('loggedInfo');
        // window.location.href = '/auth/login?expired';
        location.href = '/auth/login?expired';
    }
  }

  useEffect(() => {
    initializeUserInfo();
  })
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
