// TODO : 사용하지 않는 경우 삭제하기
import styled from '@/styles/header.module.scss';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { logout, setUserInfo } from '@/app/reduce/userSlice';
import axios from 'axios';

const LoginComponent = () => {
  const { loginToggle, name, email } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('loginInfo') !== 'true') return;

    console.log('로그인 정보 확인');

    (async function fetchAndSetUser() {
      try {
        const res = await axios.post('/user/info', '', {
          withCredentials: true,
        });
        dispatch(setUserInfo({ name: res.data.name, email: res.data.email }));
      } catch (err) {
        console.log('로그인이 확인되지 않았습니다.');
      }
    })();
  }, [loginToggle]);

  const logoutAction = async () => {
    console.log('로그아웃');
    await axios.post('/user/logout');

    localStorage.removeItem('loginInfo');
    dispatch(logout());
  };

  const userInfoAction = () => {
    console.log('회원정보 : ', name, email);
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
