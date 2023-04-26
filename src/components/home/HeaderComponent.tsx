import {Layout, Menu, Dropdown, Space} from "antd";
import type { MenuProps } from 'antd';
import React from "react";
import Image from 'next/image'
import Link from 'next/link';
import styled from '@/styles/header.module.scss';
import {PieChartOutlined, LoginOutlined} from "@ant-design/icons";


const { Header } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

const HeaderComponent = () => {

    function getItem(
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],
        type?: 'group',
    ): MenuItem {
        return {
            key,
            icon,
            children,
            label,
            type,
        } as MenuItem;
    }

    const items:MenuItem[] = [
        getItem('일', '1'),
        getItem('이', '2'),
        getItem('삼', '3'),
    ];

    const itemsTest:Array<String> = ['one', 'two', 'three'];

    return (
        <Layout>
            <Header className={styled.header}>
                <div
                    style={{
                        float: 'left',
                        width: 120,
                        height: 31,
                        margin: '16px 24px 16px 0',
                        background: 'rgba(255, 255, 255, 0.2)',
                    }}
                />
                <Menu
                    style={{float: "right"}}
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={
                        itemsTest.map((name, index) => ({
                        key: String(index),
                        label: `asdf ${name}`,
                    }))}
                    // items={items}
                />
            </Header>
        </Layout>
    )
}

export default HeaderComponent;