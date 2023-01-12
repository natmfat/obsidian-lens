import { useEffect, useState } from "react";
import { Folder, File } from "./useStore.d";
import useStore from "./useStore";
import { getExtension } from "../lib/fileSystem";

export const fetchItem = async (path?: string) => {
    const apiPath = `/api/vault${path ? `?path=${path}` : ""}`;

    let json;
    try {
        json = await fetch(apiPath).then((res) => res.json());
    } catch (e) {
        return [];
    }

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
                ext: getExtension(item.name)!,
                downloadUrl: `/api/vault?path=${item.path}&raw=true`,
            } as File;
        });
    }

    return {
        downloadUrl: apiPath + "&raw=true",
    };
};

const useVault = (parent?: File | Folder, path?: string, open?: boolean) => {
    const [loading, setLoading] = useState(false);
    const [fileSystem, updateItem] = useStore((state) => [
        state.fileSystem,
        state.updateItem,
    ]);

    const id = parent?.id || fileSystem.id;

    useEffect(() => {
        return;
        const fetchItemWrapper = async () => {
            setLoading(true);
            const vault = await fetchItem(path);
            setLoading(false);

            if (!ignore) {
                if (Array.isArray(vault)) {
                    updateItem(id, {
                        children: vault,
                    });
                } else if ("downloadUrl" in vault && vault["downloadUrl"]) {
                    updateItem(id, {
                        downloadUrl: vault.downloadUrl,
                    });
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
