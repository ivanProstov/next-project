import { useRouter } from "next/router";
import { Login as LoginComponents } from "../src/client/pages/login";

export default function Login() {
  const { push } = useRouter();
  const onClickBtn = () => {
    fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-custom-header": "fetch",
      },
      body: JSON.stringify({
        email: "test@mail.com",
        password: "123",
        isRememberMe: true,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        push("/home");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return <LoginComponents />;
}
