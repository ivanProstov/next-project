import { SC } from "../../ui/styled";
import { useGetColumns } from "@/src/client/common/hooks/use-get-columns";
import { Col, Spin } from "antd";
import React, { useEffect } from "react";
import { InputAndText } from "@/src/client/components/ui/input-and-text";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useValidationSchema } from "./lib/hooks/use-validation-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { IColumnsData } from "@/src/client/common/hooks/use-get-columns/interfaces";
import { useUpdateColumn } from "./lib/hooks/use-update-column";

export const Columns = () => {
  const { data: dataColumns, loading: loadingColumns } = useGetColumns();
  const { update: updateColumns } = useUpdateColumn();

  const validationSchema = useValidationSchema();

  const form = useForm<{ columns: IColumnsData[] }>({
    defaultValues: {
      columns: undefined,
    },
    // @ts-ignore
    resolver: yupResolver(validationSchema),
  });

  const { control, handleSubmit, reset, trigger } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns",
  });

  useEffect(() => {
    if (dataColumns) {
      form.setValue("columns", dataColumns);
    }
  }, [dataColumns]);

  if (loadingColumns) {
    return (
      <SC.SpinWrapper>
        <Spin />
      </SC.SpinWrapper>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(() => undefined)}>
      <SC.RowWrapper>
        <SC.Row gutter={[16, 16]}>
          {fields?.map((item, index) => (
            <Col key={item._id}>
              <Controller
                name={`columns.[${index}].name` as "columns"}
                control={form.control}
                render={({ field, formState }) => {
                  const fieldValue = field?.value as unknown as string;
                  const { errors } = formState;

                  return (
                    <InputAndText
                      value={fieldValue}
                      onChange={field.onChange}
                      onCancel={() => {
                        field.onChange(item.name);
                        return true;
                      }}
                      onOk={() => {
                        void trigger(`columns.[${index}].name` as "columns");
                        return handleSubmit(() => {
                          return updateColumns({
                            _id: item._id,
                            name: fieldValue,
                          });
                        })()
                          .then(() => {
                            return errors.columns?.[index]?.name?.message
                              ? false
                              : true;
                          })
                          .catch(() => false);
                      }}
                      errorMessage={errors.columns?.[index]?.name?.message}
                    />
                  );
                }}
              />
            </Col>
          ))}
        </SC.Row>
      </SC.RowWrapper>
    </form>
  );
};
