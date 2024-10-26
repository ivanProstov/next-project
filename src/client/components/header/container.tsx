import { Link } from "../ui/link";
import { onLogout } from "./lib/utils/on-logout";
import { useRouter } from "next/router";
import { SC } from "./ui/styled";
import { Avatar, Button, Tooltip } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { routes } from "@/utils/router-config/routes";
import { getAvatar } from "../../common/util/get-avatar";
import { useGetUsers } from "../../common/hooks/use-get-users";

export const Header = () => {
  const { push } = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { data: usersData, loading: usersLoading } = useGetUsers();

  const onLogOut = useCallback(() => {
    setLoading(true);
    void onLogout(push)().then(() => {
      setLoading(false);
    });
  }, []);

  return (
    <SC.Header>
      <SC.Nav>
        <Tooltip placement="top" title={usersData?.name}>
          <Avatar
            src={getAvatar(usersLoading ? "Loading" : usersData?.name || "")}
            alt="test"
          />
        </Tooltip>
        <SC.Ul>
          {routes.map(({ title, path }) => (
            <li key={path}>
              <Link href={path} text={title} />
            </li>
          ))}
        </SC.Ul>
      </SC.Nav>
      <Button
        style={{ opacity: loading ? 0.3 : 1 }}
        disabled={loading}
        htmlType="submit"
        type="primary"
        size="large"
        onClick={onLogOut}
      >
        log-out
      </Button>
    </SC.Header>
  );
};
