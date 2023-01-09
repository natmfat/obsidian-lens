import { ReactNode } from "react";
import Head from "next/head";

interface RootProps {
    title?: string;
    description?: string;
    children: ReactNode;
}

const appName = "Obsidian Viewer";
const appDescription = "View your Obsidian Vault online.";

const Root = ({ title, description = appDescription, children }: RootProps) => {
    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <title>{title ? `${appName} | ${title}` : appName}</title>
                <meta name="description" content={description} />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            {children}
        </>
    );
};

export default Root;
