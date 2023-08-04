import React from 'react';
import { Col, Row } from 'antd';
import HeaderLayout from '@/components/layout/HeaderLayout';
import MapSectionComponent from '@/components/layout/MapSectionComponent';
import ListContent from '@/components/list/ListContent';

type Props = {
  // children: React.ReactElement
};

const Layout = () => {
  // const loader = mapLoaderHook.getInstance();
  // const size = document.body;
  // console.log(size);
  const HEADER_SIZE = '100vh';

  return (
    <>
      <HeaderLayout />
      <Row>
        <Col span={16}>
          <div style={{ height: HEADER_SIZE }}>
            <MapSectionComponent />
          </div>
        </Col>
        <Col span={8}>
          <div style={{ height: HEADER_SIZE }}>
            <ListContent />
          </div>
        </Col>
      </Row>
    </>
  );
};

// <>
//   <Row>
//     <Col span={24}>
//       {/*<HeaderLayout />*/}
//       <div style={{ backgroundColor: 'red' }}></div>
//     </Col>
//   </Row>
//   <Row>
//     <Col span={18}>
//       {/*<MapSectionComponent />*/}
//       <div style={{ backgroundColor: 'blue' }}></div>
//     </Col>
//     <Col span={6}>
//       {/*<ListContent />*/}
//       <div style={{ backgroundColor: 'green' }}></div>
//     </Col>
//   </Row>
// </>

export default Layout;
