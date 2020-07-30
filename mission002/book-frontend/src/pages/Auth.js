import React from 'react';
import { AuthWrapper } from 'components/Auth';
import { Route } from 'react-router-dom';
import { Login, Register } from 'containers/Auth';

function Auth() {
  return (
    <AuthWrapper>
      <Route path="/auth/login" component={Login}/>
      <Route path="/auth/register" component={Register}/>
    </AuthWrapper>
  );
}

export default Auth;