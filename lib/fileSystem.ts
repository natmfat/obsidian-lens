import type { Store, Folder, VirtualItem } from "../hooks/useStore.d";
import vaultConfig from "../vault.config.json";

export const createFileSystem = (): Folder => ({
    name: vaultConfig.vaultName,
    path: "",
    url: "",
    id: "",
    children: [],
});

export const formatName = (fileName: string) => {
    const components = fileName.split(".");
    return components.slice(0, -1).join(".");
};

export const isNameImage = (fileName: string) =>
    /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(fileName);

export const getExtension = (fileName: string) =>
    fileName.split(".").pop()?.toLowerCase();

export const getItemByPath = (parent: Folder, path: string) => {
    const pathComponents = path
        .split("/")
        .map((t) => t.trim())
        .filter((t) => t.length);

    let currentItem: Folder | File = parent;
    while (pathComponents.length && "children" in currentItem) {
        let currentPath = pathComponents.shift();
        let foundPath = false;
        for (const item of currentItem.children) {
            if (item.name === currentPath) {
                // @ts-ignore
                currentItem = item;
                foundPath = true;
            }
        }

        if (!foundPath) {
            return null;
        }
    }

    return currentItem;
};

export const getItem = (
    parent: Folder,
    id: string,
    field?: keyof VirtualItem
): ReturnType<Store["getItem"]> => {
    if (parent.id === id) {
        return parent;
    }

    for (const child of parent.children) {
        if (child[field || "id"] === id) {
            return child;
        } else if ("children" in child) {
            const item = getItem(child, id, field);
            if (item) {
                return item;
            }
        }
    }

    return null;
};
