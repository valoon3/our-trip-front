import HeaderComponent from '@/components/layout/HeaderComponent';
import React from 'react';
import Map from '@/components/map/Map';

type Props = {
  // children: React.ReactElement
};

const Layout = () => {
  return (
    <>
      <HeaderComponent />
      <Map />
    </>
  );
};

export default Layout;
