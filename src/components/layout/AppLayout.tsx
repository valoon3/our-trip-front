import HeaderComponent from '@/components/layout/HeaderComponent';
import React from 'react';

type Props = {
  children: React.ReactChild;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <HeaderComponent />
      {children}
    </>
  )
}

export default Layout;