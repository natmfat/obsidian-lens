import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getCookie } from "cookies-next";
import { useState, useEffect } from "react";
import Root from "../components/Root";

export default function Dashboard(
    props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
    const [fileSystem, setFileSystem] = useState([]);
    useEffect(() => {
        fetch("api/vault")
            .then((res) => res.json())
            .then((json) => {
                setFileSystem(json.fileSystem);
            });
    }, []);

    return (
        <Root>
            <main className="bg-slate-200">
                <pre>{JSON.stringify(fileSystem, null, 4)}</pre>
            </main>
        </Root>
    );
}

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
