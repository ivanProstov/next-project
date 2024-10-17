import { useEffect, useRef, useState } from "react";
import { apiClient } from "@/src/client/common/util/rest-client";
import { IBoardsState } from "@/src/client/pages/board/interfaces";

export const useGetBoards = () => {
  const [query, setQuery] = useState<IBoardsState>({
    error: undefined,
    data: undefined,
    loading: true,
  });
  useEffect(() => {
    setQuery((info) => ({ ...info, loading: true }));
    apiClient
      .get("/api/authorized/board/getBoards")
      .then(({ data }) => {
        setQuery((info) => ({ ...info, data, error: undefined }));
      })
      .catch((error) => {
        setQuery((info) => ({ ...info, data: undefined, error }));
      })
      .finally(() => {
        setQuery((info) => ({ ...info, loading: false }));
      });
  }, []);
  return query;
};
