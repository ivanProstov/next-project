import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { authorizedPath } from "@/utils/constants";
import { useEffect, useState } from "react";
import { Header } from "@/src/client/components/header";
import "antd/dist/reset.css";
import { ConfigProvider } from "antd";

const getUser = () => {
  return fetch(`/api/${authorizedPath}/users/get`, {
    method: "GET",
    headers: {
      "x-custom-header": "fetch",
    },
  });
};

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<null | Record<string, any>>(null);
  useEffect(() => {
    void getUser()
      .then((response) => {
        return response.json();
      })
      .then((data) => setUser(data));
  }, []);

  console.log("user >>> ", user);

  return (
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
      <div>
        {!!user?._id && <Header />}

        <Component {...pageProps} />
      </div>
    </ConfigProvider>
  );
}
