import React from 'react';
import Link from 'next/link';
import styled from '@/styles/header.module.scss';
import LoginComponent from '@/components/content/LoginComponent';

const HeaderComponent = () => {
  const toggleLogin: boolean = false;

  return (
    <header>
      <div className={styled.header}>
        {/*<div className={styled.logo}>로고</div>*/}
        <Link href="/" className={styled.logo}>
          로고
        </Link>
        <LoginComponent />
        {/*<div className={styled.headerRight}>*/}
        {/*  <Link href="/register">회원가입</Link>*/}
        {/*  <Link href="/login">로그인</Link>*/}
        {/*</div>*/}
      </div>
    </header>
  );
};

export default HeaderComponent;
