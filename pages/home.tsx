import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<{
    id: string;
    user: string;
    users: any[];
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetch("/api/authorized/users/getUsers", {
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
    fetch("/api/authorized/users/get", {
      method: "GET",
      headers: {
        "x-custom-header": "fetch",
      },
    })
      .then((response) => {
        console.log("response >>> ", response);
        return response.json();
      })
      .then((data) => console.log("data >>> ", data));
  };

  return (
    <div>
      <div>home page</div>

      <button onClick={onClickBtn}> click </button>

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
