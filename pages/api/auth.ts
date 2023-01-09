// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "cookies-next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const code = req.query.code;
    if (!code) {
        res.status(200).redirect("/~");
        return;
    }

    const json = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/vnd.github+json",
        },
        body: JSON.stringify({
            client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code: code,
        }),
    }).then((res) => res.json());

    if (json.access_token) {
        setCookie("access_token", json.access_token, {
            req,
            res,
            maxAge: json.expires_in,
        });
    }

    res.status(200).redirect("/~");
}
