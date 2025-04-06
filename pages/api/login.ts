import { setCookie } from "cookies-next";
import type { NextApiRequest, NextApiResponse } from "next";

import { GithubClient } from "../../lib/GithubClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const code = req.query.code as string;
  if (!code) {
    res.status(200).redirect("/~");
    return;
  }

  const [data, error] = await GithubClient.getAccessToken(code);
  if (error !== null) {
    res.status(500).json({
      message: error.message,
    });
    return;
  }

  await setCookie("access_token", data.access_token, {
    req,
    res,
    maxAge: data.expires_in,
  });
  res.status(200).redirect("/~");
}
