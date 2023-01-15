import type { ViewerProps } from "./Viewer";
import { formatName, getContent } from "../../lib/fileSystem";
import rehypeMarkdown from "../../lib/rehypeMarkdown";
import { useEffect, useState } from "react";
import useStore from "../../hooks/useStore";
import SkeletonItem from "../SkeletonItem";

const ViewerText = ({ data }: ViewerProps) => {
    const [markdown, setMarkdown] = useState<string | null>();
    const fileSystem = useStore((state) => state.fileSystem);

    useEffect(() => {
        console.log(getContent(data.path));
        setMarkdown(null);
        fetch(getContent(data.path))
            .then((res) => {
                if (res.status === 404) {
                    return "";
                }

                return res.text();
            })
            .then(setMarkdown);
    }, [data.path]);

    return (
        <article className="max-w-prose mx-auto overflow-x-hidden pb-10">
            <h1 className="text-xl font-semibold mb-2">
                {formatName(data.name)}
            </h1>
            <div className="prose prose-slate">
                {markdown ? (
                    rehypeMarkdown(markdown, fileSystem)
                ) : (
                    <SkeletonItem />
                )}
            </div>
        </article>
    );
};

export default ViewerText;
