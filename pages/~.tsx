import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getCookie } from "cookies-next";
import Root from "../components/Root";
import useVault from "../hooks/useVault";
import Logo from "../components/Logo";
import FileSystem from "../components/FileSystem";
import Split from "react-split";

// props: InferGetServerSidePropsType<typeof getServerSideProps>

export default function Dashboard() {
    const { fileSystem } = useVault();

    return (
        <Root>
            <Split
                sizes={[20, 75]}
                direction="horizontal"
                className="flex"
                // className="fixed bottom-0 h-[calc(100vh-3.625rem)] w-screen bg-slate-200 dark:bg-slate-900 flex p-2"
                gutterSize={4}
            >
                <aside className="p-4 bg-slate-200 h-screen w-fit overflow-y-auto">
                    <h1 className="uppercase font-semibold text-sm mb-2 px-2 whitespace-nowrap">
                        {fileSystem.name}
                    </h1>
                    <FileSystem {...fileSystem} />
                </aside>
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
