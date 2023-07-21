import HeaderLayout from '@/components/layout/HeaderLayout';
import React from 'react';
import MapSectionComponent from '@/components/layout/MapSectionComponent';

type Props = {
  // children: React.ReactElement
};

const Layout = () => {
  return (
    <>
      <HeaderLayout />
      <MapSectionComponent />
    </>
  );
};

export default Layout;
