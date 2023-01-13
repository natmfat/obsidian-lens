import type { NextApiRequest, NextApiResponse } from "next";
import { getCookie } from "cookies-next";

import GithubClient from "../../lib/GithubClient";
import * as fs from "fs";
import { createFileSystem } from "../../lib/fileSystem";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const accessToken = getCookie("access_token", { req, res }) as string;

    try {
        // warning: this method will take a long time to run
        // it recursively fetches every tree in the repo
        const client = new GithubClient(accessToken);
        const children = await client.fetchFileSystem();

        fs.writeFileSync(
            "./fileSystem.json",
            JSON.stringify({
                ...createFileSystem(),
                children,
            })
        );

        res.status(200).json({
            fileSystem: children,
        });
    } catch (e) {
        console.log(e);
        res.status(401).json({
            message: "Could not retrieve vault. Try logging in again.",
        });
    }
}
