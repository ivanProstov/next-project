import { useCallback, useState } from "react";
import { IBoardsData, IBoardsState } from "../../interfaces";
import { apiClient } from "@/src/client/common/util/rest-client";

export const useUpdateBoards = () => {
  const [query, setQuery] = useState<IBoardsState>({
    error: undefined,
    data: undefined,
    loading: false,
  });
  const update = useCallback((values: IBoardsData) => {
    const { _id, ...rest } = values;
    setQuery((info) => ({ ...info, loading: true }));
    return apiClient
      .put("/api/authorized/board/updateBoard", { ...rest, id: _id })
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
  return { update, query };
};
