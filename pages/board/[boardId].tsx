import { GetServerSideProps } from "next";
import { apiClient } from "@/src/client/common/util/rest-client";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;

  // const queryParams = new URLSearchParams({
  //   token: query?.token as string,
  // }).toString();
  //
  // const checkVerifyToken = await apiClient
  //   .get("/api/auth/checkVerifyToken", {
  //     params: { token: query?.token },
  //   })
  //   .then((data) => data);

  return {
    props: { id: query?.boardId },
  };
};

export default function Board({ id }: { id: string }) {
  return <div>board id: {id}</div>;
}
