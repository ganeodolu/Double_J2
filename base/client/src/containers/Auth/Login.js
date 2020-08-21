import React, { useEffect } from 'react';
import { AuthContent, InputWithLabel, AuthButton, RightAlignedLink, AuthError } from 'components/Auth';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'redux/modules/auth';
import * as userActions from 'redux/modules/user';
import storage from 'lib/storage';
import queryString from 'query-string';

function Login({ history, location }) {
  const { form, error, result } = useSelector(state => ({
    form: state.auth.login.form,
    error: state.auth.login.error,
    result: state.auth.result
  }))
  const { email, password } = form;
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
    const query = queryString.parse(location.search);
    if(query.expired !== undefined) {
      setError('세션에 만료되었습니다. 다시 로그인 하세요.')
    }
    return () => {
      AuthActions.initializeForm('login')
      UserActions.setLoggedInfo(result);
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
      history.push('/');
    } catch (e) {
      setError('잘못된 계정정보입니다.');
    }
  }

  // const formik = useFormik({
  //   initialValues: {
  //     email: '',
  //     password: ''
  //   },
  //   onSubmit: async (values) => {
  //     try {
  //       await AuthActions.localLogin(values);
  //       const loggedInfo = result;
  
  //       UserActions.setLoggedInfo(loggedInfo);
  //       history.push('/');
  //       storage.set('loggedInfo', loggedInfo);
  //     } catch (e) {
  //       setError('잘못된 계정정보입니다.');
  //     }
  //   }
  // })

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