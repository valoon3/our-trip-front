import React from 'react';
import Link from 'next/link';
import styled from '@/styles/header.module.scss';

const HeaderComponent = () => {
  const toggleLogin: boolean = false;

  return (
    <header className={styled.header}>
      <div className={styled.logo}>로고</div>
      <div className={styled.headerRight}>
        <Link href="/register" className={styled.headerFont}>
          회원가입
        </Link>
        <Link href="/login" className={styled.headerFont}>
          로그인
        </Link>
      </div>
    </header>
  );
};

export default HeaderComponent;
