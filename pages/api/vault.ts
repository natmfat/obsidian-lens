// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getCookie } from "cookies-next";

import GithubClient from "../../lib/GithubClient";
import VaultModel from "../../schema/vault/model";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const accessToken = getCookie("access_token", { req, res }) as string;
    const vault = await new VaultModel().fetch();
    const client = new GithubClient(accessToken, vault.owner, vault.repo);
    const path = req.query.path as string;
    const raw = req.query.raw === "true";

    try {
        const content = await client.fetchContent(path);
        if (raw && content.download_url) {
            return res.status(200).redirect(content.download_url);
        }

        res.status(200).json({ content });
    } catch (e) {
        res.status(401).json({
            message: "Could not retrieve vault. Try logging in again.",
        });
    }
}
