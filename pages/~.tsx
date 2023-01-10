import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getCookie } from "cookies-next";
import Root from "../components/Root";
import useVault from "../hooks/useVault";
import Split from "react-split";
import FileSystemFull from "../components/FileSystemFull";

// props: InferGetServerSidePropsType<typeof getServerSideProps>

export default function Dashboard() {
    return (
        <Root>
            <Split
                sizes={[20, 75]}
                direction="horizontal"
                className="flex"
                gutterSize={4}
            >
                <FileSystemFull />
                <div className="h-full">
                    <p>Content</p>
                </div>
            </Split>
        </Root>
    );
}

// {/* <main className="bg-slate-200">
//                 {fileSystem.name}
//                 {}
//                 {/* <pre>{JSON.stringify(fileSystem, null, 4)}</pre> */}
//             </main> */}
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const accessToken = getCookie("access_token", { req, res });
    if (!accessToken) {
        return {
            redirect: {
                permanent: false,
                destination: "/",
            },
        };
    }

    return {
        props: {},
    };
};
