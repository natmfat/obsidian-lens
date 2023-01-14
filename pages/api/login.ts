import type { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "cookies-next";

import GithubClient from "../../lib/GithubClient";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const code = req.query.code as string;
    if (!code) {
        res.status(200).redirect("/~");
        return;
    }

    const json = await GithubClient.getAccessToken(code);

    if (json.access_token) {
        const options = { req, res, maxAge: json.expires_in };
        setCookie("access_token", json.access_token, options);
    }

    res.status(200).redirect("/~");
}
