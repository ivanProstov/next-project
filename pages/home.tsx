import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<{ id: string; user: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log("useEffect");
    fetch("api/user", {
      method: "GET",
      headers: {
        "x-custom-header": "fetch",
      },
    })
      .then((response) => {
        setLoading(true);
        return response.json();
      })
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => setLoading(false));
  }, []);

  console.log("data >>> ", data);

  return (
    <div>
      <div>home page</div>
      {loading && <div>...</div>}
      {!loading && (
        <>
          <div>userId: {data?.id || ""}</div>
          <div>userId: {data?.user || ""}</div>
        </>
      )}
    </div>
  );
}
