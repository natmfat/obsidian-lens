import { useEffect, useState } from "react";

import type { Item } from "../hooks/useStore.d";
import useStore from "../hooks/useStore";
import { getItem } from "../lib/fileSystem";
import ActiveFiles from "./ActiveFiles";
import Viewer from "./viewers/Viewer";

const FileContent = () => {
    const [data, setData] = useState<Item | null>(null);
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
            setData(getItem(fileSystem, focusedFile) as Item);
        } else {
            setData(null);
        }
    }, [focusedFile, fileSystem]);

    return (
        <div className="max-h-screen relative overflow-x-hidden overflow-y-auto">
            <ActiveFiles />
            {data ? (
                <article className="h-screen inset-0 absolute mt-16">
                    <Viewer data={data} />
                </article>
            ) : (
                <div className="absolute inset-0 grid place-items-center">
                    <h1 className="text-xl font-semibold mb-2 text-center">
                        No file is open
                    </h1>
                </div>
            )}
        </div>
    );
};

export default FileContent;
