import React, { useEffect } from 'react';
import { AuthContent, InputWithLabel, AuthButton, RightAlignedLink, AuthError } from 'components/Auth';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'redux/modules/auth';
import * as userActions from 'redux/modules/user';
import storage from 'lib/storage';
import { isEmail, isLength, isAlphanumeric } from 'validator';
import debounce from 'lodash/debounce';

function Register({ history }) {
  const { form, error, exists, result } = useSelector(state => ({
    form: state.auth.register.form,
    error: state.auth.register.error,
    exists: state.auth.register.exists,
    result: state.auth.result
  }));
  const { email, username, password, passwordConfirm } = form;

  const dispatch = useDispatch();
  const AuthActions = bindActionCreators(authActions, dispatch);
  const UserActions = bindActionCreators(userActions, dispatch);

  const setError = (message) => {
    AuthActions.setError({
      form: 'register',
      message
    })
  }

  const validate = {
    email: (value) => {
      if(!isEmail(value)) {
        setError('잘못된 이메일 형식 입니다.');
        return false;
      }
      setError(null);
      return true;
    },
    username: (value) => {
      if(!isAlphanumeric(value) || !isLength(value, { min:4, max:15 })){
        setError('아이디는 4~15 글자의 알파벳 혹은 숫자로 이뤄져야 합니다.');
        return false;
      }
      setError(null);
      return true;
    },
    password: (value) => {
      if(!isLength(value, { min: 6 })) {
        setError('비밀번호를 6자 이상 입력하세요.');
        return false;
      }
      setError(null);
      return true;
    },
    passwordConfirm: (value) => {
      if(password !== value) {
        setError('비밀번호확인이 일치하지 않습니다.');
        return false;
      }
      setError(null); 
      return true;
    }
  }

  const checkEmailExists = debounce(async (email) => {
    try {
      await AuthActions.checkEmailExists(email);
      // if(exists.email) {
      //   setError('이미 존재하는 이메일입니다.');
      // } else {
      //   setError(null);
      // }
    } catch(e) {
      console.log(e)
    }
  }, 300);

  const checkUsernameExists = debounce(async (username) => {
    try {
      await AuthActions.checkUsernameExists(username);
      // if(exists.username) {
      //   setError('이미 존재하는 아이디입니다.');
      // } else {
      //   setError(null);
      // }
    } catch(e) {
      console.log(e);
    }
  }, 300);
  
  const handleChange = (e) => {
    const { name, value } = e.target;

    AuthActions.changeInput({
      name,
      value,
      form: 'register'
    });

    const validation = validate[name](value);
    if(name.indexOf('password') > -1 || !validation) return;

    const check = name === 'email' ? checkEmailExists : checkUsernameExists;
    check(value)
  };

  const handleLocalRegister = async () => {
    if(error) return;

    if(!validate['email'](email) 
    || !validate['username'](username) 
    || !validate['password'](password) 
    || !validate['passwordConfirm'](passwordConfirm)) { 
      return;
    };

    try {
      await AuthActions.localRegister({ email, username, password });
      // UserActions.setValidated(true);
      history.push('/');
    } catch(e) {
      if(e.response.status === 409) {
        const { key } = e.response.data;
        const message = key === 'email' ? '이미 존재하는 이메일입니다.' : '이미 존재하는 아이디입니다.';
        return setError(message);
      }
      setError('알 수 없는 에러가 발생했습니다.')
    }
  }

  useEffect(() => {
    return () => {
      AuthActions.initializeForm('register')
    }
  }, []);

  useEffect(() => {
    if(exists.email) {
      setError('이미 존재하는 이메일입니다.');
    } else if(exists.username) {
      setError('이미 존재하는 아이디입니다.');
    }
  }, [exists])

  // const formik = useFormik({
  //   initialValues: {
  //     email: '',
  //     username: '',
  //     password: '',
  //     passwordConfirm: ''
  //   },
  //   validate,
  //   onSubmit: async (values) => {
  //     const { email, username, password, passwordConfirm } = values;
  //     if(error) return;
  //     if(exists.email || exists.username) return;

  //     try {
  //       await AuthActions.localRegister({ email, username, password });
  //       const loggedInfo = result;
  //       console.log(loggedInfo);
  //       storage.set('loggedInfo', loggedInfo);
  //       UserActions.setLoggedInfo(loggedInfo);
  //       UserActions.setValidated(true);
  //       history.push('/');
  //     } catch(e) {
  //       if(e.response.status === 409) {
  //         const { key } = e.response.data;
  //         const message = key === 'email' ? '이미 존재하는 이메일입니다.' : '이미 존재하는 아이디입니다.';
  //         return setError(message);
  //       }
  //       setError('알 수 없는 에러가 발생했습니다.')
  //     }
  //   }
  // })

  return (
    <AuthContent title="회원가입">
      <InputWithLabel 
        label="이메일" 
        name="email" 
        placeholder="이메일"
        value={email}
        onChange={handleChange}
      />
      <InputWithLabel 
        label="아이디" 
        name="username" 
        placeholder="아이디"
        value={username}
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
      <InputWithLabel 
        label="비밀번호 확인" 
        name="passwordConfirm" 
        placeholder="비밀번호 확인" 
        type="password"
        value={passwordConfirm}
        onChange={handleChange}
      />
      {
        error && <AuthError>{error}</AuthError>
      }
      <AuthButton onClick={handleLocalRegister}>회원가입</AuthButton>
      <RightAlignedLink to="/auth/login">로그인</RightAlignedLink>
    </AuthContent>
  );
}

export default Register;