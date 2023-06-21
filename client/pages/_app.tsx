import React from "react";
import { ConfigProvider } from "antd";
import { AppProps } from "next/app";
import "../styles/global.scss";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#34af88",
        },
      }}
    >
      <Component {...pageProps} />
    </ConfigProvider>
  );
};

export default MyApp;
