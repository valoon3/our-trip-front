import { Layout, Menu, Dropdown, Space } from 'antd';
import type { MenuProps } from 'antd';
import React from "react";
import Link from 'next/link';
import styled from '@/styles/header.module.scss';


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

    const signUp = () => {

    }

    return (
      <header className={styled.header}>
        <div className={styled.logo}/>
        <div className={styled.headerRight}>
          <div>
            <Link href="/" className={styled.headerFont} onClick={signUp}>회원가입</Link>
          </div>
          <div>
            <Link href="/" className={styled.headerFont} onClick={signUp}>로그인</Link>
          </div>
        </div>
      </header>
    )
}

export default HeaderComponent;