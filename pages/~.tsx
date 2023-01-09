import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getCookie } from "cookies-next";
import Root from "../components/Root";
import useVault from "../hooks/useVault";
import Logo from "../components/Logo";
import FileSystem from "../components/FileSystem";

// props: InferGetServerSidePropsType<typeof getServerSideProps>

export default function Dashboard() {
    const { fileSystem } = useVault();

    return (
        <Root>
            <aside className="p-4 bg-slate-200 h-screen w-fit overflow-y-auto">
                <h1 className="uppercase font-semibold text-sm mb-2 px-2">
                    {fileSystem.name}
                </h1>
                <FileSystem {...fileSystem} />
            </aside>
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
