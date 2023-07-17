import React from 'react';
import Banner from './Banner';
import Layout from '../layouts/landing/Layout';
import Features from './Features';

type Props = {};

const Home = (props: Props) => {
  return (
    <Layout>
      <div className="container">
        <Banner />
        <Features />
      </div>
    </Layout>
  );
};

export default Home;
