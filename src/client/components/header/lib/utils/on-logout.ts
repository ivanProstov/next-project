import { apiClient } from "@/src/client/common/util/rest-client";
import { loginUrl } from "@/utils/constants";

export const onLogout = (push: (value: unknown) => Promise<boolean>) => () => {
  return apiClient.post("/api/auth/logout").then((response) => {
    void push(loginUrl);
  });
};
