import { useEffect, useState } from "react";
import { Button } from "antd";
import { apiClient } from "@/src/client/common/util/rest-client";

export default function Home() {
  const [data, setData] = useState<{
    userId: string;
    name: string;
    users: any[];
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    apiClient
      .get("/api/authorized/users/getUsers")
      .then(({ data }) => {
        setLoading(true);
        console.log("data >>> ", data);
        setData(data);
      })
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => setLoading(false));
  }, []);

  const onClickBtn = () => {
    apiClient
      .get("/api/authorized/users/get")
      .then(({ data }) => console.log("data >>> ", data));
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
