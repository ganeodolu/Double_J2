import React, { useEffect } from 'react';
import { AuthContent, InputWithLabel, AuthButton, RightAlignedLink, AuthError } from 'components/Auth';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'redux/modules/auth';
import * as userActions from 'redux/modules/user';
import storage from 'lib/storage';
import queryString from 'query-string';

function Login({ history, location }) {
  const { error, result } = useSelector(state => ({
    error: state.auth.login.error,
    result: state.auth.result
  }))
  const dispatch = useDispatch();
  const AuthActions = bindActionCreators(authActions, dispatch);
  const UserActions = bindActionCreators(userActions, dispatch);

  useEffect(() => {
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

  const handleLocalLogin = async (values) => {
    try {
      await AuthActions.localLogin(values);
      const loggedInfo = result;

      UserActions.setLoggedInfo(loggedInfo);
      history.push('/');
      storage.set('loggedInfo', loggedInfo);
    } catch (e) {
      setError('잘못된 계정정보입니다.');
    }
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: values => handleLocalLogin(values)
  })

  return (
    <AuthContent title="로그인">
      <form onSubmit={formik.handleSubmit}>
        <InputWithLabel 
          label="이메일" 
          name="email" 
          placeholder="이메일"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <InputWithLabel 
          label="비밀번호" 
          name="password" 
          placeholder="비밀번호" 
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        {
          error && <AuthError>{error}</AuthError>
        }
        <AuthButton type="submit">로그인</AuthButton>
        <RightAlignedLink to="/auth/register">회원가입</RightAlignedLink>
      </form>
    </AuthContent>
  );
}

export default Login;