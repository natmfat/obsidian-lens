import { useEffect } from "react";
import { Folder, File } from "./useStore.d";
import useStore from "./useStore";

export const fetchFolder = async (path?: string) => {
    const json = await fetch(`/api/vault${path ? `?path=${path}` : ""}`).then(
        (res) => res.json()
    );

    if (json.fileSystem) {
        return json.fileSystem.map((item: any) => {
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
    }

    return [];
};

const useVault = (parent?: Folder, path?: string) => {
    const [fileSystem, clearFolder, addChildren] = useStore((state) => [
        state.fileSystem,
        state.clearFolder,
        state.addChildren,
    ]);

    useEffect(() => {
        const fetchFolderWrapper = async () => {
            const id = parent?.id || fileSystem.id;
            clearFolder(id);

            const vault = await fetchFolder(path);
            if (!ignore) {
                addChildren(id, vault);
            }
        };

        let ignore = false;
        fetchFolderWrapper();
        return () => {
            ignore = true;
        };
    }, []);

    return { fileSystem };
};

export default useVault;
