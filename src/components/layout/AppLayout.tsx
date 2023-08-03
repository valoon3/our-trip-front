import HeaderLayout from '@/components/layout/HeaderLayout';
import React from 'react';
import MapSectionComponent from '@/components/layout/MapSectionComponent';
import mapLoaderHook from '@/coustomHook/mapLoaderHook';
import ListContent from '@/components/list/ListContent';

type Props = {
  // children: React.ReactElement
};

const Layout = () => {
  const loader = mapLoaderHook.getInstance();

  return (
    <>
      <MapSectionComponent />
      <HeaderLayout />
      <ListContent />
    </>
  );
};

export default Layout;
