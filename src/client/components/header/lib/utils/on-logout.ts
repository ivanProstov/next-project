import { loginUrl } from "@/utils/constants";

export const onLogout = (push: (value: unknown) => Promise<boolean>) => () =>
  fetch("/api/auth/logout", {
    method: "POST",
    headers: {
      "x-custom-header": "fetch",
    },
  }).then((response) => {
    void push(loginUrl);
  });
