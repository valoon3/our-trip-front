import { Layout, Menu, Dropdown, Space } from 'antd';
import type { MenuProps } from 'antd';
import React from "react";
import Link from 'next/link';
import styled from '@/styles/header.module.scss';
import AppLayout from '@/components/layout/AppLayout';

const HeaderComponent = () => {

  const toggleLogin: boolean = false;

    return (
      <header className={styled.header}>
        <div className={styled.logo}>로고</div>
        <div className={styled.headerRight}>
          <div>
            <Link href="/register" className={styled.headerFont}>회원가입</Link>
          </div>
          <div>
            <Link href="/login" className={styled.headerFont}>로그인</Link>
          </div>
        </div>
      </header>
    )
}

export default HeaderComponent;