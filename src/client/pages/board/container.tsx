import React, { useCallback, useState } from "react";
import { Avatar, Card, Col, Button, Result, Tooltip, Popover } from "antd";
import { EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Link } from "../../components/ui/link";
import { Path } from "@/utils/router-config/routes";
import { useGetBoards } from "@/src/client/pages/board/lib/hooks/use-get-boards";
import { IBoardsData } from "@/src/client/pages/board/interfaces";
import { CreateUpdateBoard } from "./components/create-update-board";
import { SC } from "./ui/styled";
import { createAvatar } from "@dicebear/core";
import { initials, lorelei } from "@dicebear/collection";

export const Board = () => {
  const { loading, data, error } = useGetBoards();
  const [openEdit, setOpenEdit] = useState<IBoardsData | undefined | boolean>(
    undefined,
  );

  const getAvatar = useCallback((title: string) => {
    const avatar = createAvatar(initials, {
      seed: title,
    });

    return avatar.toDataUri();
  }, []);

  const showDrawer = (data: IBoardsData) => {
    setOpenEdit(data);
  };

  const onClose = () => {
    setOpenEdit(undefined);
  };

  const actions: (id: IBoardsData) => React.ReactNode[] = (
    data: IBoardsData,
  ) => [<EditOutlined onClick={() => showDrawer(data)} key="edit" />];

  if (error) {
    return (
      <Result status="error" title="An error occurred while loading boards." />
    );
  }

  return (
    <>
      <SC.RowWrapper>
        <SC.Row gutter={[16, 16]}>
          {data?.map((item) => {
            const { _id, prefix, name, description } = item;
            const _prefix = prefix ? `(${prefix})` : "";
            return (
              <Col span={6} key={_id}>
                <Card
                  loading={loading}
                  actions={actions(item)}
                  style={{ minWidth: 300 }}
                >
                  <Link
                    href={`${Path.BOARD}/${_id}`}
                    text={
                      <Card.Meta
                        avatar={<Avatar src={getAvatar(`${_prefix}${name}`)} />}
                        title={`${_prefix} ${name}`}
                        description={
                          !!description ? (
                            <Popover
                              style={{ width: 100 }}
                              content={
                                <div
                                  onClick={(e) => e.preventDefault()}
                                  style={{
                                    width: "300px",
                                    maxHeight: "150px",
                                    overflow: "auto",
                                  }}
                                >
                                  {description}
                                </div>
                              }
                              trigger="hover"
                            >
                              <SC.Description>
                                {description ?? "not description"}
                              </SC.Description>
                            </Popover>
                          ) : (
                            <SC.Description>
                              {description ?? "not description"}
                            </SC.Description>
                          )
                        }
                      />
                    }
                  />
                </Card>
              </Col>
            );
          })}
        </SC.Row>
      </SC.RowWrapper>
      <CreateUpdateBoard data={openEdit} onClose={onClose} />
      <SC.ButtonWrapper>
        <Tooltip placement="top" title={"add new Board"}>
          <Button
            className="btn-add-board"
            size="large"
            type="primary"
            onClick={() => setOpenEdit(true)}
          >
            <PlusCircleOutlined />
          </Button>
        </Tooltip>
      </SC.ButtonWrapper>
    </>
  );
};
