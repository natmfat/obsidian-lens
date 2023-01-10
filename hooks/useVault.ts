import { useEffect, useState } from "react";
import { Folder, File } from "./useStore.d";
import useStore from "./useStore";

const cache: Record<string, Folder[]> = {};
export const fetchFolder = async (path?: string): Promise<Folder[]> => {
    const apiPath = `/api/vault${path ? `?path=${path}` : ""}`;
    if (cache.hasOwnProperty(apiPath)) {
        return cache[apiPath];
    }

    const json = await fetch(apiPath).then((res) => res.json());

    if (json.fileSystem) {
        const fileSystem = json.fileSystem.map((item: any) => {
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
            } as File;
        });

        cache[apiPath] = fileSystem;
        return fileSystem;
    }

    return [];
};

const useVault = (parent?: Folder, path?: string, open?: boolean) => {
    const [loading, setLoading] = useState(false);
    const [fileSystem, clearFolder, addChildren] = useStore((state) => [
        state.fileSystem,
        state.clearFolder,
        state.addChildren,
    ]);

    const id = parent?.id || fileSystem.id;

    useEffect(() => {
        const fetchFolderWrapper = async () => {
            clearFolder(id);
            setLoading(true);
            const vault = await fetchFolder(path);
            setLoading(false);

            if (!ignore) {
                addChildren(id, vault);
            }
        };

        let ignore = false;
        open && fetchFolderWrapper();
        return () => {
            ignore = true;
        };
    }, [open]);

    return { fileSystem, loading };
};

export default useVault;
