import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "antd/dist/reset.css";
import { ConfigProvider } from "antd";
import { Layout } from "@/src/client/components/layout";
import GlobalStyle from "@/src/client/common/util/rest-client/style/globalStyles";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#01939A",
            borderRadius: 5,
            fontSize: 16,
            fontWeightStrong: 700,
          },
          components: {
            Input: {
              paddingBlockLG: 10,
            },
          },
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ConfigProvider>
    </>
  );
}
