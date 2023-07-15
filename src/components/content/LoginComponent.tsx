// TODO : 사용하지 않는 경우 삭제하기
import styled from '@/styles/header.module.scss';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { login, logout, setUserInfo } from '@/app/reduce/userSlice';
import { getCookie } from 'cookies-next';
import axios from 'axios';

const LoginComponent = () => {
  const loginToggle = useSelector((state: RootState) => state.user.loginToggle);
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('컴포넌트가 화면에 나타남');

    (async function fetchAndSetUser() {
      const res = await axios.post('/user/info');
      console.log('로그인 정보', res.data);
      dispatch(login());
      dispatch(setUserInfo(res.data));
    })();
  }, [loginToggle]);

  const logoutAction = () => {
    console.log('로그아웃');
    console.log(getCookie('token'));
    dispatch(logout());
  };

  const userInfoAction = () => {
    console.log('회원정보 : ', userInfo);
  };

  return (
    <>
      <div className={styled.headerRight}>
        {!loginToggle ? (
          <>
            <Link href="/register">회원가입</Link>
            <Link href="/login">로그인</Link>
          </>
        ) : (
          <>
            <button onClick={userInfoAction}>회원정보</button>
            <Link href="/" onClick={logoutAction}>
              로그아웃
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default LoginComponent;
