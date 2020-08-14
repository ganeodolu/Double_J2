import React from 'react';
import Header, { LoginButton } from 'components/Base/Header';
import { useSelector } from 'react-redux';

function HeaderContainer() {
  const { visible } = useSelector(state => ({
    visible: state.base.header.visible
  }))
  
  if(!visible) return null;

  return (
    <Header>
      <LoginButton/>
    </Header>
  );
}

export default HeaderContainer;