import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [data, setData] = useState<{
    id: string;
    user: string;
    users: any[];
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { push } = useRouter();

  useEffect(() => {
    fetch("/api/authorized/users/get", {
      method: "GET",
      headers: {
        "x-custom-header": "fetch",
      },
    })
      .then((response) => {
        setLoading(true);
        return response.json();
      })
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => setLoading(false));
  }, []);

  const onClickBtn = () => {
    fetch("/api/authorized/users/getSession", {
      method: "GET",
      headers: {
        "x-custom-header": "fetch",
      },
    }).then((response) => {
      console.log("response >>> ", response);
      return response.json();
    });
  };

  const onLogout = useCallback(() => {
    fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "x-custom-header": "fetch",
      },
    }).then((response) => {
      console.log("response >>> ", response);

      // return response.json();
      push("/login");
    });
  }, []);

  return (
    <div>
      <div>home page</div>

      <button onClick={onClickBtn}> click </button>

      <button onClick={onLogout}> logout </button>

      {loading && <div>...</div>}
      {!loading && (
        <>
          <div>userId: {data?.id || ""}</div>
          <div>userId: {data?.user || ""}</div>
          <div>
            users:
            {(data?.users || []).map((user: any) => (
              <div key={user._id}>{JSON.stringify(user, null, "\t")}</div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
