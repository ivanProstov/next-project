import { useEffect, useState } from "react";
import { apiClient } from "@/src/client/common/util/rest-client";
import { IColumnsState } from "./interfaces";

export const useGetColumns = () => {
  const [query, setQuery] = useState<IColumnsState>({
    error: undefined,
    data: undefined,
    loading: true,
  });
  useEffect(() => {
    setQuery((info) => ({ ...info, loading: true }));
    apiClient
      .get("/api/authorized/board/getColumns")
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
