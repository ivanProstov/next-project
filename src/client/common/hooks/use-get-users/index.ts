import { useEffect, useState } from "react";
import { apiClient } from "@/src/client/common/util/rest-client";
import { IUsersState } from "./interfaces";

export const useGetUsers = () => {
  const [query, setQuery] = useState<IUsersState>({
    error: undefined,
    data: undefined,
    loading: true,
  });
  useEffect(() => {
    setQuery((info) => ({ ...info, loading: true }));
    apiClient
      .get("/api/authorized/users/getUsers")
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
