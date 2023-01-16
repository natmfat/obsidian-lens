import Split from "react-split";

import Root from "../components/Root";
import FileSystemFull from "../components/FileSystemFull";
import FileContent from "../components/FileContent";
import useKeyboard from "../hooks/useKeyboard";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import VaultModel from "../schema/vault/model";
import { useEffect } from "react";
import useStore from "../hooks/useStore";
import { buildFileSystem } from "../lib/fileSystem";

// TODO:
// Ctrl + file click = new item
// Click in left = change focused item, replace active with new item
// Ctrl + w = remove focused active item

export default function Dashboard({
    name,
    paths,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const set = useStore((state) => state.set);
    useEffect(() => {
        set((state) => {
            state.fileSystem = buildFileSystem(paths);
            state.fileSystem.name = name;
            state.fileSystemPaths = paths;
        });
    }, []);

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

export const getServerSideProps: GetServerSideProps = async () => {
    const vault = new VaultModel();
    (await vault.fetch()).disconnect();

    return {
        props: {
            name: vault.name,
            paths: vault.paths,
        },
    };
};
