import { Button, Drawer, Space } from "antd";
import React, { useEffect } from "react";
import { IBoardsData } from "../../interfaces";
import { FormProvider, useForm } from "react-hook-form";
import { useGetColumns } from "@/src/client/common/hooks/use-get-columns";
import { useGetUsers } from "@/src/client/common/hooks/use-get-users";
import { ICreateUpdateBoardProps } from "./interfaces";
import { useUpdateBoards } from "@/src/client/pages/board/lib/hooks/use-update-boards";
import { useCreateBoards } from "@/src/client/pages/board/lib/hooks/use-create-boards";
import { useValidationSchema } from "./lib/hooks/use-validation-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormComponent } from "./ui/form";

export const CreateUpdateBoard = ({
  data,
  onClose,
  setUpdateBoard,
}: ICreateUpdateBoardProps) => {
  const { data: dataColumns, loading: loadingColumns } = useGetColumns();
  const { data: dataUsers, loading: loadingUsers } = useGetUsers();
  const { create: createBoard } = useCreateBoards();
  const { update: updateBoard } = useUpdateBoards();
  const schema = useValidationSchema();

  const form = useForm<IBoardsData>({
    resolver: yupResolver(schema),
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
      void updateBoard(value).then((data) => {
        setUpdateBoard(data);
        onClose();
      });
    }
    if (!isEdit) {
      void createBoard(value).then((data) => {
        setUpdateBoard(data);
        onClose();
      });
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
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormComponent
            dataUsers={dataUsers}
            dataColumns={dataColumns}
            loadingColumns={loadingColumns}
            loadingUsers={loadingUsers}
            isEdit={isEdit}
            onClose={onClose}
          />
        </form>
      </FormProvider>
    </Drawer>
  );
};
