import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '@/redux/store';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { AppProps } from 'next/app';
import '../styles/global.scss';
import '../styles/antd.scss';
import { SessionProvider } from 'next-auth/react';

const antdTheme = {
  token: {
    colorPrimary: '#34af88',
  },
};

const MyApp: React.FC<AppProps> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <ConfigProvider theme={antdTheme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SessionProvider session={pageProps.session}>
            <Component {...pageProps} />
          </SessionProvider>
        </PersistGate>
      </Provider>
    </ConfigProvider>
  );
};

export default MyApp;
