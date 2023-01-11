import { useEffect, useState } from "react";

import type { File } from "../hooks/useStore.d";
import useStore from "../hooks/useStore";
import { formatName, getItem } from "../lib/fileSystem";
import rehypeMarkdown from "../lib/rehypeMarkdown";
import ActiveFiles from "./ActiveFiles";

interface FileContentProps {
    defaultFile?: string;
}

const FileContent = ({ defaultFile }: FileContentProps) => {
    const [data, setData] = useState<File | null>(null);
    const [fileSystem, setActive, focusedFile, setFocusedFile] = useStore(
        (state) => [
            state.fileSystem,
            state.setActive,
            state.focusedFile,
            state.setFocusedFile,
        ]
    );

    useEffect(() => {
        if (focusedFile) {
            setData(getItem(fileSystem, focusedFile) as File);
        } else if (defaultFile) {
            const item = getItem(fileSystem, defaultFile) as File;
            if (item) {
                setData(item);
                setActive(item);
                setFocusedFile(item.id);
            }
        } else {
            setData(null);
        }
    }, [defaultFile, focusedFile, fileSystem]);

    return (
        <div className="h-screen w-full px-1 overflow-y-auto relative">
            <ActiveFiles />
            {data ? (
                <article className="mt-16 max-w-3xl mx-auto overflow-x-hidden">
                    <h1 className="text-xl font-semibold mb-2">
                        {formatName(data.name)}
                    </h1>
                    <div>
                        {rehypeMarkdown(
                            Buffer.from(data.content, "base64").toString()
                        )}
                    </div>
                    <footer className="h-10"></footer>
                </article>
            ) : (
                <div className="h-full grid place-items-center">
                    <h1 className="text-xl font-semibold mb-2 text-center">
                        No file is open
                    </h1>
                </div>
            )}
        </div>
    );
};

export default FileContent;
