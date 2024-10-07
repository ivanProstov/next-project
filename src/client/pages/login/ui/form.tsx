import { Controller, useFormContext } from "react-hook-form";
import { SC } from "@/src/client/pages/login/ui/styled";
import { Button, Checkbox, Input, Spin, Typography } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { IFormInputs } from "../interfaces";
import React, { useCallback, useState } from "react";
import { openNotification } from "@/src/client/common/util/notification";
import { useRouter } from "next/router";

export const Form = () => {
  const {
    formState: { errors },
    ...form
  } = useFormContext<IFormInputs>();
  const [loading, setLoading] = useState<boolean>(false);
  const { Text } = Typography;
  const { push } = useRouter();

  const onClickBtn = useCallback(
    (value: IFormInputs) => {
      setLoading(true);
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
          push("/home");
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
          openNotification("error", "Login error", error.message || "");
        });
    },
    [openNotification],
  );

  return (
    <form onSubmit={form.handleSubmit(onClickBtn)}>
      <div>
        <Controller
          name="email"
          control={form.control}
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
          control={form.control}
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
          control={form.control}
          render={({ field }) => {
            return (
              <Checkbox onChange={field.onChange} checked={field.value}>
                Remember me
              </Checkbox>
            );
          }}
        />
        <div style={{ position: "relative" }}>
          {loading && (
            <SC.SpinWrapper>
              <Spin size="large" />
            </SC.SpinWrapper>
          )}
          <Button
            style={{ opacity: loading ? 0.3 : 1 }}
            disabled={loading}
            htmlType="submit"
            type="primary"
            size="large"
          >
            Login
          </Button>
        </div>
      </SC.FormFooter>
    </form>
  );
};
