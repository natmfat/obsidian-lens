import { GetServerSideProps } from "next";
import { getCookie } from "cookies-next";
import Root from "../components/Root";
import Split from "react-split";
import FileSystemFull from "../components/FileSystemFull";
import FileContent from "../components/FileContent";

// props: InferGetServerSidePropsType<typeof getServerSideProps>

export default function Dashboard() {
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
