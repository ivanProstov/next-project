import { useCallback, useState } from "react";
import { IBoardsData, IBoardsState } from "@/src/client/pages/board/interfaces";
import { apiClient } from "@/src/client/common/util/rest-client";

export const useCreateBoards = () => {
  const [query, setQuery] = useState<IBoardsState>({
    error: undefined,
    data: undefined,
    loading: false,
  });
  const create = useCallback((values: IBoardsData) => {
    const { _id, ...rest } = values;
    setQuery((info) => ({ ...info, loading: true }));
    return apiClient
      .post("/api/authorized/board/createBoard", { ...rest, id: _id })
      .then(({ data }) => {
        setQuery((info) => ({ ...info, data, error: undefined }));
        return data;
      })
      .catch((error) => {
        setQuery((info) => ({ ...info, data: undefined, error }));
        return error;
      })
      .finally(() => {
        setQuery((info) => ({ ...info, loading: false }));
        return;
      });
  }, []);
  return { create, query };
};
