import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Split from "react-split";

import Root from "../components/Root";
import FileSystemFull from "../components/FileSystemFull";
import FileContent from "../components/FileContent";

export default function Dashboard({
    path,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    return {
        props: {
            path: query.path || "",
        },
    };
};
