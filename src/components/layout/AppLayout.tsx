import React, { useMemo } from 'react';
import { Col, Row } from 'antd';
import HeaderLayout from '@/components/layout/HeaderLayout';
import MapSectionComponent from '@/components/layout/MapSectionComponent';
import RightSideContent from '@/components/list/RightSideContent';

type Props = {
  // children: React.ReactElement
};

const Layout = () => {
  // const loader = mapLoaderHook.getInstance();
  // const size = document.body;
  // console.log(size);
  const HEADER_SIZE = '100vh';
  const style = useMemo(() => ({ height: HEADER_SIZE }), []);

  return (
    <>
      <Row>
        <Col span={16}>
          <div style={style}>
            <HeaderLayout />
            <MapSectionComponent />
          </div>
        </Col>
        <Col span={8}>
          <div style={style}>
            <RightSideContent />
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
