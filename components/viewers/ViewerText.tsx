import type { ViewerProps } from "./Viewer";
import { formatName } from "../../lib/fileSystem";
import rehypeMarkdown from "../../lib/rehypeMarkdown";
import { useEffect, useState } from "react";
import useStore from "../../hooks/useStore";

const ViewerText = ({ data }: ViewerProps) => {
    const [markdown, setMarkdown] = useState<string>();
    const fileSystem = useStore((state) => state.fileSystem);

    useEffect(() => {
        data.downloadUrl &&
            fetch(data.downloadUrl)
                .then((res) => {
                    if (res.status === 404) {
                        return "";
                    }

                    return res.text();
                })
                .then(setMarkdown);
    }, [data.downloadUrl]);

    return (
        <article className="max-w-prose mx-auto overflow-x-hidden pb-10">
            <h1 className="text-xl font-semibold mb-2">
                {formatName(data.name)}
            </h1>
            <div className="prose prose-slate">
                {markdown && rehypeMarkdown(markdown, fileSystem)}
            </div>
        </article>
    );
};

export default ViewerText;
