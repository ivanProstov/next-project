import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { authorizedPath } from "@/utils/constants";
import { useEffect, useState } from "react";
import { Header } from "@/src/client/components/header";

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
    <div>
      {!!user?._id && <Header />}

      <Component {...pageProps} />
    </div>
  );
}
