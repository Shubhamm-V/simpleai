import React, { Fragment } from 'react';
import Dashboard from './Dashboard';
import { Helmet } from 'react-helmet';
const index = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Dashboard />
    </Fragment>
  );
};

export default index;
