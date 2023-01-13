import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const accessToken = req.cookies.get("access_token")?.value;
    if (accessToken) {
        return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/", req.url));
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        "/api/vault",
        "/api/vaultFull",
        "/api/vaultResolvePath",
        "/~/:slug*",
    ],
};
