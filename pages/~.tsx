import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useEffect } from "react";
import Split from "react-split";

import Root from "../components/Root";
import FileSystemFull from "../components/FileSystemFull";
import FileContent from "../components/FileContent";
import { getCookie } from "cookies-next";
import GitHubClient from "../lib/GithubClient";
import useStore from "../hooks/useStore";

export default function Dashboard({
    fileSystem,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    // const set = useStore((state) => state.set);
    // useEffect(() => {
    //     set((state) => {
    //         state.fileSystem.children = fileSystem;
    //     });
    // }, []);

    return (
        <Root>
            <Split
                sizes={[20, 80]}
                direction="horizontal"
                className="flex"
                gutterSize={4}
            >
                <FileSystemFull />
                <FileContent />
            </Split>
        </Root>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    // try {
    //     const accessToken = getCookie("access_token", { req, res }) as string;
    //     const client = new GitHubClient(accessToken);
    //     const fileSystem = await client.fetchFileSystem();

    //     return {
    //         props: {
    //             fileSystem,
    //         },
    //     };
    // } catch (e) {
    return {
        props: {
            fileSystem: {},
        },
    };
    // }
};
