import {
  IColumnsData,
  IColumnsState,
} from "@/src/client/common/hooks/use-get-columns/interfaces";
import { apiClient } from "@/src/client/common/util/rest-client";
import { useCallback, useState } from "react";

export const useUpdateColumn = () => {
  const [query, setQuery] = useState<IColumnsState>({
    error: undefined,
    data: undefined,
    loading: false,
  });
  const update = useCallback((values: IColumnsData) => {
    const { _id, ...rest } = values;
    setQuery((info) => ({ ...info, loading: true }));
    return apiClient
      .put("/api/authorized/board/updateColumn", { ...rest, id: _id })
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
