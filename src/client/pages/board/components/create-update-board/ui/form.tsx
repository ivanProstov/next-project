import { Col, Input, Row, Select, Tag, Form, Typography } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import React, { useCallback } from "react";
import { IColumnsData } from "@/src/client/common/hooks/use-get-columns/interfaces";
import { IUsersData } from "@/src/client/common/hooks/use-get-users/interfaces";
import { IBoardsData } from "@/src/client/pages/board/interfaces";

interface IFormComponentProps {
  isEdit: string | false | undefined;
  loadingColumns?: boolean;
  loadingUsers?: boolean;
  dataColumns?: IColumnsData[];
  dataUsers?: IUsersData;
  onClose: () => void;
}
const { Text } = Typography;
export const FormComponent = ({
  isEdit,
  loadingColumns,
  loadingUsers,
  dataColumns,
  dataUsers,
  onClose,
}: IFormComponentProps) => {
  const form = useFormContext<IBoardsData>();
  const getLabel = useCallback((errorMessage: string, label: string) => {
    return (
      <Text
        type={errorMessage ? "danger" : "secondary"}
      >{`${label} ${errorMessage}`}</Text>
    );
  }, []);

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        {isEdit && (
          <Controller
            name="_id"
            control={form.control}
            render={({ field, formState }) => {
              const errorMessage = formState.errors?._id?.message || "";
              return (
                <Form.Item
                  layout={"vertical"}
                  label={getLabel(errorMessage, "ID")}
                  tooltip={"ID board"}
                >
                  <Input
                    status={(errorMessage && "error") || ""}
                    size="large"
                    placeholder="ID"
                    disabled={true}
                    onChange={(isEdit && field.onChange) || undefined}
                    value={field.value}
                  />
                </Form.Item>
              );
            }}
          />
        )}
      </Col>
      <Col span={24}>
        <Controller
          name="prefix"
          control={form.control}
          render={({ field, formState }) => {
            const errorMessage = formState.errors?.prefix?.message || "";
            return (
              <Form.Item
                layout={"vertical"}
                label={getLabel(errorMessage, "Prefix")}
              >
                <Input
                  status={(errorMessage && "error") || ""}
                  size="large"
                  placeholder="Prefix"
                  onChange={field.onChange}
                  value={field.value}
                />
              </Form.Item>
            );
          }}
        />
      </Col>
      <Col span={24}>
        <Controller
          name="name"
          control={form.control}
          render={({ field, formState }) => {
            const errorMessage = formState.errors?.name?.message || "";
            return (
              <Form.Item
                layout={"vertical"}
                label={getLabel(errorMessage, "Name")}
              >
                <Input
                  size="large"
                  status={(errorMessage && "error") || ""}
                  placeholder="Name"
                  value={field.value}
                  onChange={field.onChange}
                />
              </Form.Item>
            );
          }}
        />
      </Col>
      <Col span={24}>
        <Controller
          name="columns"
          control={form.control}
          render={({ field, formState }) => {
            const errorMessage = formState.errors?.columns?.message || "";
            return (
              <Form.Item
                layout={"vertical"}
                label={getLabel(errorMessage, "Columns")}
              >
                <Select
                  size={"large"}
                  status={(errorMessage && "error") || ""}
                  loading={loadingColumns}
                  mode="multiple"
                  placeholder="Columns"
                  style={{ width: "100%" }}
                  value={field.value}
                  options={dataColumns?.map(({ _id, name }) => ({
                    value: _id,
                    label: name,
                  }))}
                  onChange={field.onChange}
                />
              </Form.Item>
            );
          }}
        />
      </Col>
      <Col span={24}>
        <Controller
          name="users"
          control={form.control}
          render={({ field, formState }) => {
            const errorMessage = formState.errors?.users?.message || "";
            return (
              <Form.Item
                layout={"vertical"}
                label={getLabel(errorMessage, "Users")}
              >
                <Select
                  size={"large"}
                  loading={loadingUsers}
                  status={(errorMessage && "error") || ""}
                  style={{ width: "100%" }}
                  mode="multiple"
                  placeholder="Users"
                  value={field.value}
                  tagRender={({ label, value }) => (
                    <Tag
                      color={dataUsers?.userId !== value ? "blue" : "red"}
                      onClose={onClose}
                      style={{ marginInlineEnd: 4 }}
                    >
                      {label}
                    </Tag>
                  )}
                  options={dataUsers?.users?.map(({ _id, name, email }) => ({
                    value: _id,
                    label: `${email} ${name}`,
                    disabled: dataUsers?.userId === _id,
                  }))}
                  onChange={field.onChange}
                />
              </Form.Item>
            );
          }}
        />
      </Col>
      <Col span={24}>
        <Controller
          name="description"
          control={form.control}
          render={({ field, formState }) => {
            const errorMessage = formState.errors?.description?.message || "";
            return (
              <Form.Item
                layout={"vertical"}
                label={getLabel(errorMessage, "Description")}
              >
                <Input.TextArea
                  status={(errorMessage && "error") || ""}
                  rows={4}
                  placeholder={"Description"}
                  value={field.value}
                  onChange={field.onChange}
                />
              </Form.Item>
            );
          }}
        />
      </Col>
    </Row>
  );
};
