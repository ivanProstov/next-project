import {
  Button,
  Col,
  Drawer,
  Input,
  Row,
  Select,
  Space,
  Tag,
  Form,
} from "antd";
import React, { useEffect } from "react";
import { IBoardsData } from "../../interfaces";
import { Controller, useForm } from "react-hook-form";
import { useGetColumns } from "@/src/client/common/hooks/use-get-columns";
import { useGetUsers } from "@/src/client/common/hooks/use-get-users";

interface ICreateUpdateBoardProps {
  data: IBoardsData | undefined | boolean;
  onClose: () => void;
}

export const CreateUpdateBoard = ({
  data,
  onClose,
}: ICreateUpdateBoardProps) => {
  const { data: dataColumns, loading: loadingColumns } = useGetColumns();
  const { data: dataUsers, loading: loadingUsers } = useGetUsers();

  const form = useForm<IBoardsData>({
    // defaultValues: {},
    // resolver: yupResolver(schema),
  });

  const isEdit = typeof data !== "boolean" && data?._id;

  useEffect(() => {
    if (isEdit) {
      form.setValue("_id", data._id);
      form.setValue("name", data.name);
      form.setValue("description", data.description);
      form.setValue("prefix", data.prefix);
      form.setValue("columns", data.columns);
      form.setValue("users", data.users);
      return;
    }
    if (!isEdit) {
      form.reset();
      return;
    }
  }, [data, isEdit]);

  const onSubmit = (value: IBoardsData) => {
    if (isEdit) {
      console.log("edit >>> ", value);
    }
    if (!isEdit) {
      console.log("add >>> ", value);
    }
  };

  return (
    <Drawer
      title={isEdit ? "Update Board" : "Create Board"}
      width={720}
      onClose={onClose}
      open={!!data}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
      extra={
        <Space>
          <Button
            type="primary"
            size="large"
            onClick={form.handleSubmit(onSubmit)}
          >
            Submit
          </Button>
        </Space>
      }
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            {isEdit && (
              <Form.Item layout={"vertical"} label="ID" tooltip={"ID board"}>
                <Controller
                  name="_id"
                  control={form.control}
                  render={({ field }) => {
                    return (
                      <Input
                        // status={(errors?.email?.message && "error") || ""}
                        size="large"
                        placeholder="ID"
                        disabled={true}
                        onChange={(isEdit && field.onChange) || undefined}
                        value={field.value}
                      />
                    );
                  }}
                />
              </Form.Item>
            )}
          </Col>
          <Col span={24}>
            <Form.Item layout={"vertical"} label="Prefix">
              <Controller
                name="prefix"
                control={form.control}
                render={({ field }) => {
                  return (
                    <Input
                      // status={(errors?.email?.message && "error") || ""}
                      size="large"
                      placeholder="Prefix"
                      onChange={field.onChange}
                      value={field.value}
                    />
                  );
                }}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item layout={"vertical"} label="Name">
              <Controller
                name="name"
                control={form.control}
                render={({ field }) => {
                  return (
                    <Input
                      size="large"
                      placeholder="Name"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  );
                }}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item layout={"vertical"} label="Columns">
              <Controller
                name="columns"
                control={form.control}
                render={({ field }) => {
                  return (
                    <Select
                      size={"large"}
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
                  );
                }}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item layout={"vertical"} label="Users">
              <Controller
                name="users"
                control={form.control}
                render={({ field }) => {
                  return (
                    <Select
                      size={"large"}
                      loading={loadingUsers}
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
                      options={dataUsers?.users?.map(
                        ({ _id, name, email }) => ({
                          value: _id,
                          label: `${email} ${name}`,
                          disabled: dataUsers?.userId === _id,
                        }),
                      )}
                      onChange={field.onChange}
                    />
                  );
                }}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item layout={"vertical"} label="Description">
              <Controller
                name="description"
                control={form.control}
                render={({ field }) => {
                  return (
                    <Input.TextArea
                      rows={4}
                      placeholder={"Description"}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  );
                }}
              />
            </Form.Item>
          </Col>
        </Row>
      </form>
    </Drawer>
  );
};
