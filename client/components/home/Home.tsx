import React from 'react';
import Banner from './Banner';
import Layout from '../layouts/Layout';

type Props = {};

const Home = (props: Props) => {
  return (
    <Layout>
      <div className="container">
        <Banner />
        <div style={{ height: '80vh' }}></div>
      </div>
    </Layout>
  );
};

export default Home;
