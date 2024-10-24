import { SC } from "../../ui/styled";
import { useGetColumns } from "@/src/client/common/hooks/use-get-columns";
import { Col, Input, Spin } from "antd";
import React from "react";

export const Columns = () => {
  const { data: dataColumns, loading: loadingColumns } = useGetColumns();

  console.log("data >>> ", dataColumns);

  if (loadingColumns) {
    return (
      <SC.SpinWrapper>
        <Spin />
      </SC.SpinWrapper>
    );
  }

  return (
    <SC.RowWrapper>
      <SC.Row gutter={[16, 16]}>
        {dataColumns?.map((item) => (
          <Col key={item._id}>
            <Input
              // status={(errorMessage && "error") || ""}
              size="large"
              placeholder="Column"
              disabled={true}
              // onChange={(isEdit && field.onChange) || undefined}
              value={item.name}
            />
          </Col>
        ))}
      </SC.Row>
    </SC.RowWrapper>
  );
};
