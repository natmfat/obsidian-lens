import { useEffect, useState } from "react";
import { Folder, File } from "./useStore.d";
import useStore from "./useStore";
import { getExtension } from "../lib/fileSystem";

const fetchedBefore: string[] = [];
export const fetchItem = async (path?: string) => {
    path && fetchedBefore.push(path);
    const apiPath = `/api/vault${path ? `?path=${path}` : ""}`;

    const json = await fetch(apiPath)
        .then((res) => res.json())
        .catch(() => ({}));

    const fs = json.fileSystem;
    if (Array.isArray(fs)) {
        return fs.map((item: any) => {
            const virtualItem = {
                name: item.name,
                path: item.path,
                url: item.git_url,
                id: item.sha,
            };

            if (item.type === "dir") {
                return {
                    ...virtualItem,
                    children: [],
                } as Folder;
            }

            return {
                ...virtualItem,
                content: "",
                ext: getExtension(item.name)!,
            } as File;
        });
    } else if (fs.type === "file") {
        return {
            content: fs.content,
            ext: getExtension(fs.name)!,
        };
    }

    return [];
};

const useVault = (parent?: File | Folder, path?: string, open?: boolean) => {
    const [loading, setLoading] = useState(false);
    const [fileSystem, clearFolder, addChildren, setContent] = useStore(
        (state) => [
            state.fileSystem,
            state.clearFolder,
            state.addChildren,
            state.setContent,
        ]
    );

    const id = parent?.id || fileSystem.id;

    useEffect(() => {
        const fetchItemWrapper = async () => {
            if (path && fetchedBefore.includes(path)) {
                return;
            }

            clearFolder(id);
            setLoading(true);
            const vault = await fetchItem(path);
            setLoading(false);

            if (!ignore) {
                if (Array.isArray(vault)) {
                    addChildren(id, vault);
                } else if ("content" in vault) {
                    setContent(id, vault.content, vault.ext);
                }
            }
        };

        let ignore = false;
        open && fetchItemWrapper();
        return () => {
            ignore = true;
        };
    }, [open]);

    return { fileSystem, loading };
};

export default useVault;
