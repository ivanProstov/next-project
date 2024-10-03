import { Button, Checkbox, Input, notification, Typography } from "antd";
import { SC } from "./ui/styled";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { IFormInputs } from "./interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { useValidationSchema } from "./lib/hooks/useValidationSchema";
import { openNotification } from "@/src/client/common/util/notification";
import { useCallback } from "react";
export const Login = () => {
  const { Title, Text } = Typography;

  const schema = useValidationSchema();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormInputs>({
    defaultValues: {
      email: undefined,
      password: undefined,
      rememberMe: false,
    },
    resolver: yupResolver(schema),
  });

  const { push } = useRouter();

  const onClickBtn = useCallback(
    (value: IFormInputs) => {
      fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-custom-header": "fetch",
        },
        body: JSON.stringify(value),
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
          openNotification("error", "Login error", error.message || "");
        });
    },
    [openNotification],
  );

  return (
    <SC.FormWrapper>
      <Title level={1}>Login</Title>
      <form onSubmit={handleSubmit(onClickBtn)}>
        <div>
          <Controller
            name="email"
            control={control}
            render={({ field }) => {
              return (
                <SC.InputWrapper>
                  <Text type="danger" className="error">
                    {errors?.email?.message}
                  </Text>
                  <Input
                    className="input"
                    status={(errors?.email?.message && "error") || ""}
                    size="large"
                    placeholder="email"
                    prefix={<UserOutlined />}
                    onChange={field.onChange}
                    value={field.value}
                  />
                </SC.InputWrapper>
              );
            }}
          />
        </div>
        <div>
          <Controller
            name="password"
            control={control}
            render={({ field }) => {
              return (
                <SC.InputWrapper>
                  <Text type="danger" className="error">
                    {errors?.password?.message}
                  </Text>
                  <Input.Password
                    className="input"
                    size="large"
                    status={(errors?.password?.message && "error") || ""}
                    placeholder="password"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    prefix={<LockOutlined />}
                    onChange={field.onChange}
                    value={field.value}
                  />
                </SC.InputWrapper>
              );
            }}
          />
        </div>
        <SC.FormFooter>
          <Controller
            name="rememberMe"
            control={control}
            render={({ field }) => {
              return (
                <Checkbox onChange={field.onChange} checked={field.value}>
                  Remember me
                </Checkbox>
              );
            }}
          />
          <Button htmlType="submit" type="primary">
            Click Me
          </Button>
        </SC.FormFooter>
      </form>
    </SC.FormWrapper>
  );
};
