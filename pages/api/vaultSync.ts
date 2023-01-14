import type { NextApiRequest, NextApiResponse } from "next";
import { getCookie } from "cookies-next";

import redis from "../../lib/database";
import GithubClient from "../../lib/GithubClient";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const accessToken = getCookie("access_token", { req, res }) as string;
    const client = new GithubClient(accessToken);
    const children = await client.fetchFileSystem();

    res.status(200).json({
        children,
    });

    // redis.multi();
    // for (const child of children) {
    //     redis.set(child.path, child.id);
    // }

    // redis.exec();

    //     redis
    //   .multi()
    //   .set("foo", "bar")
    //   .get("foo")
    //   .exec((err, results) => {
    //     // results === [[null, 'OK'], [null, 'bar']]
    //   });
}
