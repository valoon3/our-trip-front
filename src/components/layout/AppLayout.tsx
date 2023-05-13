import HeaderComponent from '@/components/layout/HeaderComponent';
import React from 'react';

type Props = {
  // children: React.ReactChild;
  children: React.ReactElement
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