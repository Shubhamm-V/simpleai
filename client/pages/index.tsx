import Home from '@/components/home/Home';
import { Helmet } from 'react-helmet';
import React, { Fragment } from 'react';
const index: React.FC = () => {
  return (
    <Fragment>
      <Helmet>
        <title>SimpleAI</title>
      </Helmet>
      <Home />
    </Fragment>
  );
};

export default index;
