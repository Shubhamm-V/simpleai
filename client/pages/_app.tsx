import React from 'react';
import { ConfigProvider } from 'antd';
import { AppProps } from 'next/app';
import '../styles/global.scss';
import '../styles/antd.scss';
import { SessionProvider } from 'next-auth/react';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#34af88',
        },
      }}
    >
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ConfigProvider>
  );
};

export default MyApp;
