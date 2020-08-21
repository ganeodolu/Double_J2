import React, { useEffect } from 'react';
import Header, { LoginButton, LogoutButton, SearchBar, SearchButton } from 'components/Base/Header';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'redux/modules/user';
import * as kakaoActions from 'redux/modules/kakao';
import storage from 'lib/storage';

function HeaderContainer() {
  const { visible, user, text, result } = useSelector(state => ({
    visible: state.base.header.visible,
    user: state.user,
    text: state.kakao.text,
    result: state.auth.result
  }))

  const dispatch = useDispatch();
  const UserActions = bindActionCreators(userActions, dispatch);
  const KakaoActions = bindActionCreators(kakaoActions, dispatch);
  
  useEffect(() => {
    if(Object.keys(result).length !== 0){
      UserActions.setLoggedInfo(result);
      storage.set('loggedInfo', result);
      UserActions.setValidated(true);
    }
  }, [result])

  if(!visible) return null;

  const handleChange = (e) => {
    const value = e.target.value;

    KakaoActions.changeInput({ value });
  }

  const handleLogout = async () => {
    try {
      await UserActions.logout();
    } catch(e) {
      console.log(e)
    };
    
    storage.remove('loggedInfo');
    window.location.href = '/';
  }

  const handleSearch = async () => {
    try {
      await KakaoActions.searchKakaoBooks(text);
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Header>
      <SearchBar 
        name="search"
        placeholder="검색"
        value={text}
        onChange={handleChange}
      />
      <SearchButton onClick={handleSearch}>검색</SearchButton>
      {
        user.logged ? 
          <LogoutButton onClick={handleLogout} username={user.loggedInfo.username}/> 
          : <LoginButton/>
      }
    </Header>
  );
}

export default HeaderContainer;