import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '@/redux/store';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { AppProps } from 'next/app';
import '../styles/global.scss';
import '../styles/antd.scss';
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/router';
import { IGONRE_WRAPPER_PAGES } from '@/constants/url';
import DashLayout from '@/components/layouts/dashboard/DashLayout';

const antdTheme = {
  token: {
    colorPrimary: '#34af88',
  },
};

const MyApp: React.FC<AppProps> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter();
  const shouldRenderWrapper = !IGONRE_WRAPPER_PAGES.includes(router.pathname);
  return (
    <ConfigProvider theme={antdTheme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SessionProvider session={pageProps.session}>
            {!shouldRenderWrapper ? (
              <Component {...pageProps} />
            ) : (
              <DashLayout>
                <Component {...pageProps} />
              </DashLayout>
            )}
          </SessionProvider>
        </PersistGate>
      </Provider>
    </ConfigProvider>
  );
};

export default MyApp;
