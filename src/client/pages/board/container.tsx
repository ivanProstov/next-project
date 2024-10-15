import { useEffect } from "react";
import { apiClient } from "@/src/client/common/util/rest-client";

export const Board = () => {
  useEffect(() => {
    apiClient
      .get("/api/authorized/board/getBoards")
      .then(({ data }) => {
        console.log("data >>> ", data);
      })
      .catch((error) => console.error("Error fetching data:", error));
    // .finally(() => setLoading(false));
    console.log("useEffect");
  }, []);

  return <div> Board component </div>;
};
