import HeaderComponent from '@/components/layout/HeaderComponent';
import React from 'react';
import MapSectionComponent from '@/components/layout/MapSectionComponent';

type Props = {
  // children: React.ReactElement
};

const Layout = () => {
  return (
    <>
      <HeaderComponent />
      <MapSectionComponent />
    </>
  );
};

export default Layout;
