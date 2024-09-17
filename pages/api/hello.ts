// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { nameUsersInHeaders } from "@/utils/constants";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const user = req.headers[nameUsersInHeaders] as string | undefined;
  res.status(200).json(JSON.parse(user || ""));
}
