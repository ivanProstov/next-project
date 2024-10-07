import { Verify as VerifyComponent } from "@/src/client/pages/verify";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;

  const queryParams = new URLSearchParams({
    token: query?.token as string,
  }).toString();

  const checkVerifyToken = await fetch(
    `http://localhost:3000/api/auth/checkVerifyToken?${queryParams}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-custom-header": "fetch",
      },
    },
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => data);

  return {
    props: { verify: checkVerifyToken ?? false },
  };
};

export default function Registration(props: { verify: boolean }) {
  return <VerifyComponent {...props} />;
}
