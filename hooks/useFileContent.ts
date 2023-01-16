import { useEffect, useState } from "react";
import { getContent } from "../lib/fileSystem";

const useFileContent = (path: string) => {
    const [content, setContent] = useState<string | null>(null);
    useEffect(() => {
        setContent(null);
        fetch(getContent(path))
            .then((res) => {
                if (res.status === 404) return "";
                return res.text();
            })
            .then(setContent);
    }, [path]);

    return content;
};

export default useFileContent;
