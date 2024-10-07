import { SC } from "./ui/styled";
import { Button, Input, Result, Typography } from "antd";
import React, { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IFormInputs } from "./interfaces";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { loginUrl } from "@/utils/constants";
import { Link } from "@/src/client/components/ui/link";
import { openNotification } from "@/src/client/common/util/notification";
import { useRouter } from "next/router";

export const Verify = (props: { verify: boolean }) => {
  const { query, push } = useRouter();
  const { Title, Text } = Typography;
  const [loading, setLoading] = useState<boolean>(false);

  const {
    formState: { errors },
    ...form
  } = useForm<IFormInputs>({
    defaultValues: {
      name: undefined,
      password: undefined,
      confirmPassword: undefined,
    },
    resolver: yupResolver(
      yup.object().shape({
        name: yup
          .string()
          .min(2, "Password must be at least 6 characters")
          .required("Name is required"),
        password: yup
          .string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required")
          .test({
            name: "confirmPassword",
            message: "Passwords do not match. Please try again.",
            test: function () {
              return this.parent[this.path] === this.parent.confirmPassword;
            },
          }),
        confirmPassword: yup
          .string()
          .min(6, "Password must be at least 6 characters")
          .required("ConfirmPassword is required"),
      }),
    ),
  });

  const onSubmit = useCallback((value: IFormInputs) => {
    setLoading(true);
    const queryParams = new URLSearchParams({
      token: query?.token as string,
    }).toString();
    console.log("queryParams >> ", queryParams);
    fetch(`/api/auth/verify?${queryParams}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-custom-header": "fetch",
      },
      body: JSON.stringify({ name: value.name, password: value.password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        void push(loginUrl);
      })
      .catch((error) => {
        openNotification("error", "Verify error", error.message || "");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <SC.FormWrapper>
      <Title level={1}>Verify</Title>

      {!props.verify && (
        <Result
          status="warning"
          title="The verification token has expired or is invalid."
          extra={<Link $size="24px" href={loginUrl} text={"Login"} />}
        />
      )}
      {props.verify && (
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <Controller
              name="name"
              control={form.control}
              render={({ field }) => {
                return (
                  <SC.InputWrapper>
                    <Text type="danger" className="error">
                      {errors?.name?.message}
                    </Text>
                    <Input
                      className="input"
                      status={(errors?.name?.message && "error") || ""}
                      size="large"
                      placeholder="name"
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
          <div>
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field }) => {
                return (
                  <SC.InputWrapper>
                    <Text type="danger" className="error">
                      {errors?.confirmPassword?.message}
                    </Text>
                    <Input.Password
                      className="input"
                      size="large"
                      status={
                        (errors?.confirmPassword?.message && "error") || ""
                      }
                      placeholder="confirm password"
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
          <div>
            <Button
              loading={loading}
              htmlType="submit"
              type="primary"
              size="large"
            >
              Registration
            </Button>
          </div>
        </form>
      )}
    </SC.FormWrapper>
  );
};
