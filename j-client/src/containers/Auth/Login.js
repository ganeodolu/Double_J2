import React, { useEffect } from 'react';
import { AuthContent, InputWithLabel, AuthButton, RightAlignedLink } from 'components/Auth';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'redux/modules/auth';
import * as userActions from 'redux/modules/user';
import storage from 'lib/storage';
import { AuthError } from '../../components/Auth';
import queryString from 'query-string';

function Login({ history, location }) {
  const { form, error, result } = useSelector(state => ({
    form: state.auth.getIn(['login', 'form']),
    error: state.auth.getIn(['login', 'error']),
    result: state.auth.get('result')
  }));
  const { email, password } = form.toJS();
  const dispatch = useDispatch();
  const AuthActions = bindActionCreators(authActions, dispatch);
  const UserActions = bindActionCreators(userActions, dispatch);

  const handleChange = (e) => {
    const { name, value } = e.target;

    AuthActions.changeInput({
      name,
      value,
      form: 'login'
    });
  }

  useEffect(() => {
    AuthActions.initializeForm('Login')
    const query = queryString.parse(location.search);
    if(query.expired !== undefined) {
      setError('세션에 만료되었습니다. 다시 로그인 하세요.')
    }
  }, [])

  const setError = (message) => {
    AuthActions.setError({
      form: 'login',
      message
    });
    return false;
  }

  const handleLocalLogin = async () => {
    try {
      await AuthActions.localLogin({email, password});
      const loggedInfo = result.toJS();

      UserActions.setLoggedInfo(loggedInfo);
      history.push('/');
      storage.set('loggedInfo', loggedInfo);
    } catch (e) {
      setError('잘못된 계정정보입니다.');
    }
  }

  return (
    <AuthContent title="로그인">
      <InputWithLabel 
        label="이메일" 
        name="email" 
        placeholder="이메일"
        value={email}
        onChange={handleChange} 
      />
      <InputWithLabel 
        label="비밀번호" 
        name="password" 
        placeholder="비밀번호" 
        type="password"
        value={password}
        onChange={handleChange} 
      />
      {
        error && <AuthError>{error}</AuthError>
      }
      <AuthButton onClick={handleLocalLogin}>로그인</AuthButton>
      <RightAlignedLink to="/auth/register">회원가입</RightAlignedLink>
    </AuthContent>
  );
}

export default Login;