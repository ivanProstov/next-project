import { Button, Checkbox, Input, Typography } from "antd";
import { SC } from "./ui/styled";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useRouter } from "next/router";
export const Login = () => {
  const { Title } = Typography;

  // TODO: временное решение
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const { push } = useRouter();
  const onClickBtn = () => {
    fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-custom-header": "fetch",
      },
      body: JSON.stringify({
        email: login,
        password: password,
        isRememberMe: rememberMe,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        push("/home");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <SC.FormWrapper>
      <Title level={1}>Login</Title>
      <form>
        <div>
          <Input
            size="large"
            placeholder="default size"
            prefix={<UserOutlined />}
            onChange={(e) => setLogin(e.target.value)}
            value={login}
          />
        </div>
        <div>
          <Input.Password
            size="large"
            placeholder="input password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            prefix={<LockOutlined />}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <SC.FormFooter>
          <Checkbox
            onChange={(e) => setRememberMe(e.target.checked)}
            checked={rememberMe}
          >
            Remember me
          </Checkbox>
          <Button onClick={onClickBtn} type="primary">
            Click Me
          </Button>
        </SC.FormFooter>
      </form>
    </SC.FormWrapper>
  );
};
