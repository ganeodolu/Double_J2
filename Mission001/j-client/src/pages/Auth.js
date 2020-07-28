import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route } from 'react-router-dom';
import * as baseActions from 'redux/modules/base';
import { AuthWrapper } from 'components/Auth';
import { Login, Register } from 'containers/Auth';

function Auth() {
  const dispatch = useDispatch();
  const BaseActions = bindActionCreators(baseActions, dispatch);

  useEffect(() => {
    BaseActions.setHeaderVisibility(false)
    return () =>{
      BaseActions.setHeaderVisibility(true);
    };
  }, []);
  
  return (
    <AuthWrapper>
      <Route path="/auth/Login" component={Login} />
      <Route path="/auth/Register" component={Register} />
    </AuthWrapper>
  );
}

export default Auth;