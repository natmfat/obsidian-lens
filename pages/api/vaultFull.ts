// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getCookie } from "cookies-next";
import GithubClient from "../../lib/GithubClient";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const accessToken = getCookie("access_token", { req, res }) as string;

    try {
        // warning: this method will take a long time to run
        // it recursively fetches every tree in the repo
        const client = new GithubClient(accessToken);
        res.status(200).json({
            fileSystem: await client.fetchFileSystem(),
        });
    } catch (e) {
        console.log(e);
        res.status(401).json({
            message: "Could not retrieve vault. Try logging in again.",
        });
    }
}
