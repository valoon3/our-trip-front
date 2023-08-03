import React from 'react';
import Link from 'next/link';
import styled from '@/styles/header.module.scss';
import LoginComponent from '@/components/header/LoginComponent';
import SearchComponent from '@/components/header/SearchComponent';

const HeaderLayout = () => {
  return (
    <header>
      <div className={styled.header}>
        {/*<div className={styled.logo}>로고</div>*/}
        <Link href="/" className={styled.logo}>
          로고
        </Link>
        {/* 검색창 */}
        <SearchComponent />
        <LoginComponent />
        {/*<div className={styled.headerRight}>*/}
        {/*  <Link href="/register">회원가입</Link>*/}
        {/*  <Link href="/login">로그인</Link>*/}
        {/*</div>*/}
      </div>
    </header>
  );
};

export default HeaderLayout;
