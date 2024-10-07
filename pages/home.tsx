import { useEffect, useState } from "react";
import { Button } from "antd";

export default function Home() {
  const [data, setData] = useState<{
    userId: string;
    name: string;
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
      <div style={{ margin: "5px" }}>
        <Button onClick={onClickBtn} type="primary">
          Click Me
        </Button>
      </div>

      {loading && <div>...</div>}
      {!loading && (
        <>
          <div>userId: {data?.userId || ""}</div>
          <div>name: {data?.name || ""}</div>
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
