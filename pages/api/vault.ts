// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getCookie } from "cookies-next";
import GithubClient from "../../lib/GithubClient";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const accessToken = getCookie("access_token", { req, res }) as string;
    const path = req.query.path as string;
    const full = req.query.full === "true";
    const raw = req.query.raw === "true";

    try {
        const client = new GithubClient(accessToken);
        if (full) {
            res.status(200).json({
                fileSystem: await client.fetchFileSystem(),
            });

            return;
        }

        const fileSystem = await client.fetchContent(path);

        if (raw && fileSystem.download_url) {
            res.status(200).redirect(fileSystem.download_url);
        } else {
            res.status(200).json({
                fileSystem,
            });
        }
    } catch (e) {
        console.log(e);
        res.status(401).json({
            message: "Could not retrieve vault. Try logging in again.",
        });
    }
}
