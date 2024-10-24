import React, { useMemo } from "react";
import { Col, Segmented } from "antd";
import { SC } from "./ui/styled";
import { SegmentedType } from "./constants";
import { Board as BoardComponent } from "./components/board";
import { useRouter } from "next/router";
import { EditIcon } from "@/src/client/components/icons";

export const Board = () => {
  const router = useRouter();
  const { query } = router;

  const segmentedType = useMemo(
    () => query?.type || SegmentedType.BOARDS,
    [query, SegmentedType],
  );
  const addQueryParam = (value: string) => {
    const currentPath = router.pathname;
    const currentQuery = router.query;
    const newQuery = { ...currentQuery, type: value };

    void router.push(
      {
        pathname: currentPath,
        query: newQuery,
      },
      undefined,
      {
        shallow: true,
      },
    );
  };

  return (
    <>
      <SC.RowWrapper>
        <SC.Row gutter={[16, 16]}>
          <Col span={24}>
            <Segmented
              size="large"
              options={[
                {
                  label: "Boards",
                  value: SegmentedType.BOARDS,
                  icon: <EditIcon />,
                },
                {
                  label: "Columns",
                  value: SegmentedType.COLUMNS,
                  icon: <EditIcon />,
                },
              ]}
              value={segmentedType}
              onChange={(value: string) => addQueryParam(value)}
            />
          </Col>
        </SC.Row>
      </SC.RowWrapper>
      {segmentedType === SegmentedType.BOARDS && <BoardComponent />}
      {segmentedType === SegmentedType.COLUMNS && (
        <SC.RowWrapper>columns</SC.RowWrapper>
      )}
    </>
  );
};
