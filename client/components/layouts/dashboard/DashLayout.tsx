import React from 'react';
import Sidebar from './Sidebar';
import { Layout } from 'antd';
const DashLayout = (props: React.PropsWithChildren) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar content={props.children} />
    </Layout>
  );
};

export default DashLayout;
