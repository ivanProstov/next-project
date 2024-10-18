import { createAvatar } from "@dicebear/core";
import { initials } from "@dicebear/collection";
import { useGetBoards } from "../../lib/hooks/use-get-boards";
import React, { useMemo, useState } from "react";
import { IBoardsData } from "../../interfaces";
import { EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Col, Popover, Result, Tooltip } from "antd";
import { SC } from "../../ui/styled";
import { Link } from "@/src/client/components/ui/link";
import { Path } from "@/utils/router-config/routes";
import { CreateUpdateBoard } from "../create-update-board";

const getAvatar = (title: string) => {
  const avatar = createAvatar(initials, {
    seed: title,
  });
  return avatar.toDataUri();
};

export const Board = () => {
  const { loading, data, error } = useGetBoards();
  const [openEdit, setOpenEdit] = useState<IBoardsData | undefined | boolean>(
    undefined,
  );

  // TODO: удалить после имплементации стейт менеджера
  const [updateBoard, setUpdateBoard] = useState<IBoardsData | undefined>(
    undefined,
  );

  const showDrawer = (data: IBoardsData) => {
    setOpenEdit(data);
  };

  const onClose = () => {
    setOpenEdit(undefined);
  };

  // TODO: удалить после имплементации стейт менеджера
  const updateData = useMemo(() => {
    const isItem = data?.some(({ _id }) => _id === updateBoard?._id);
    if (data && updateBoard && isItem) {
      return data?.map((item) =>
        item._id === updateBoard?._id ? updateBoard : item,
      );
    }
    if (data && updateBoard && !isItem) {
      return [...data, updateBoard];
    }
    return data;
  }, [data, updateBoard]);

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
          {updateData?.map((item) => {
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
      <CreateUpdateBoard
        data={openEdit}
        onClose={onClose}
        setUpdateBoard={setUpdateBoard}
      />
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
