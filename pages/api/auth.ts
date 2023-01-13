// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "cookies-next";

import GithubClient from "../../lib/GithubClient";
import vaultConfig from "../../vault.config.json";

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

        if (vaultConfig.logging) {
            console.log(
                `Your access token is ${json.access_token}\nCopy your access token and run cacheFileSystem.ts to optimize Obsidian Viewer (ideally every time your vault changes). Remember to turn off logging later.`
            );
        }
    }

    res.status(200).redirect("/~");
}
