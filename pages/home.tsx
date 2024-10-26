import { useEffect, useState } from "react";
import { Button } from "antd";
import { apiClient } from "@/src/client/common/util/rest-client";
import { useGetUsers } from "@/src/client/common/hooks/use-get-users";

export default function Home() {
  const { data: usersData, loading: usersLoading } = useGetUsers();

  // TODO: вынести в отдельный hook и заиспользовать там где это нужно
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

      {usersLoading && <div>...</div>}
      {!usersLoading && (
        <>
          <div>userId: {usersData?.userId || ""}</div>
          <div>name: {usersData?.name || ""}</div>
          <div>
            users:
            {(usersData?.users || []).map((user: any) => (
              <div key={user._id}>{JSON.stringify(user, null, "\t")}</div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
