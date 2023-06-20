import { Layout, Menu, Dropdown, Space } from 'antd';
import type { MenuProps } from 'antd';
import React from "react";
import Link from 'next/link';
import styled from '@/styles/header.module.scss';
import AppLayout from '@/components/layout/AppLayout';

const { Header } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

const SIGN_UP:React.Key = 'signUp';
const LOGIN:React.Key = 'login';

const HeaderComponent = () => {

  const toggleLogin: boolean = false;

    function getItem(
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],
        type?: 'group',
    ): MenuItem {
        return {
          label,
          key,
          icon,
          children,
          type,
        } as MenuItem;
    }

    const items:MenuItem[] = [
        getItem(
          '회원가입',
          SIGN_UP,
        ),
        getItem(
          <Link href="/" >a</Link>,
          LOGIN,
        ),
    ];

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