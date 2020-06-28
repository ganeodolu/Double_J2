import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header, { LoginButton, LogoutButton } from 'components/Base/Header';
import * as userActions from 'redux/modules/user';
import { bindActionCreators } from 'redux';
import storage from 'lib/storage';

function HeaderContainer() {
  const [text, setText] = useState('');
  const { visible, user } = useSelector(state => ({
    visible: state.base.getIn(['header', 'visible']),
    user: state.user
  }));
  const dispatch = useDispatch();
  const UserActions = bindActionCreators(userActions, dispatch);
  
  if(!visible) return null;

  const handleLogout = async () => {
    try {
      await UserActions.logout();
    } catch(e) {
      console.log(e)
    };
    
    storage.remove('loggedInfo');
    window.location.href = '/';
  }

  return (
    <Header>
      {
        user.get('logged')
        ? 
        <LogoutButton onClick={handleLogout} username={user.getIn(['loggedInfo', 'username'])} />
      : <LoginButton />
      }
    </Header>
  );
}

export default HeaderContainer;