import { deleteCookie } from "cookies-next";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  deleteCookie("access_token", { req, res });
  res.status(200).redirect("/~");
}
