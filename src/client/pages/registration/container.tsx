import { SC } from "./ui/styled";
import { Controller, useForm } from "react-hook-form";
import { IFormInputs } from "./interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Input, Result, Typography, Spin } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "@/src/client/components/ui/link";
import { loginUrl } from "@/utils/constants";
import React, { useCallback, useState } from "react";
import { openNotification } from "@/src/client/common/util/notification";
import { apiClient } from "@/src/client/common/util/rest-client";

export const Registration = () => {
  const { Title, Text } = Typography;
  const [isRegistration, setIsRegistration] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    formState: { errors },
    ...form
  } = useForm<IFormInputs>({
    defaultValues: {
      email: undefined,
    },
    resolver: yupResolver(
      yup.object().shape({
        email: yup
          .string()
          .email("Invalid email")
          .required("Email is required"),
      }),
    ),
  });

  const onClickBtn = useCallback(
    (value: IFormInputs) => {
      setLoading(true);
      apiClient
        .post<IFormInputs>("/api/auth/invite", value)
        .then((data) => {
          setIsRegistration(!!data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
          openNotification("error", "Registration error", error.message || "");
        });
    },
    [openNotification],
  );

  return (
    <SC.FormWrapper>
      <Title level={1}>Registration</Title>
      {isRegistration ? (
        <Result
          icon={<SC.Icon />}
          title="Invitation has been sent to your email!"
        />
      ) : (
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
          <SC.ContentPosition>
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
              Registration
            </Button>
          </SC.ContentPosition>
        </form>
      )}

      <SC.FormFooter>
        <Link href={loginUrl} text={"Login"} />
      </SC.FormFooter>
    </SC.FormWrapper>
  );
};
