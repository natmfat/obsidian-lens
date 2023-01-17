import Split from "react-split";

import Root from "../components/Root";
import FileSystemFull from "../components/FileSystemFull";
import FileContent from "../components/FileContent";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import VaultModel from "../schema/vault/model";
import { registerFileSystem } from "../hooks/useStore";
import { registerKeyboard } from "../hooks/useKeyboard";
import Apps from "../components/Apps";

// TODO:
// Ctrl + file click = new item
// Click in left = change focused item, replace active with new item
// Ctrl + w = remove focused active item

export default function Dashboard({
    name,
    paths,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    registerFileSystem(name, paths);
    registerKeyboard();

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

            <Apps />
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
