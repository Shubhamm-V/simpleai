import React from 'react';
import Header from './Header';

const Layout = (props: React.PropsWithChildren) => {
  return (
    <div>
      <Header />
      <main>{props.children}</main>
    </div>
  );
};

export default Layout;
