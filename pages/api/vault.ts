// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getCookie } from "cookies-next";
import GithubClient from "../../lib/GithubClient";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const accessToken = getCookie("access_token", { req, res }) as string;
    if (!accessToken) {
        res.status(200).redirect("/~");
        return;
    }

    try {
        const client = new GithubClient(accessToken);
        const path = req.query.path as string;

        res.status(200).json({
            fileSystem: await client.fetchContent(path),
        });
    } catch (e) {
        res.status(200).json({
            error: "Could not retrieve vault. Try logging in again.",
        });
    }
}
