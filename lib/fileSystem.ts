import type { Store, Folder, VirtualItem } from "../hooks/useStore.d";
import vaultConfig from "../vault.config.json";

/**
 * Create an empty file system (basically a folder without a parent)
 * @returns Empty file system
 */
export const createFileSystem = (): Folder => ({
    name: vaultConfig.vaultName,
    path: "",
    url: "",
    id: "",
    children: [],
});

/**
 * Format the name of a file
 * Removes the extension
 * @param fileName Name of the file
 * @returns File name without the extension
 */
export const formatName = (fileName: string) => {
    const components = fileName.split(".");
    return components.slice(0, -1).join(".");
};

/**
 * Determines if a file name is associated with an image format
 * @param fileName Name of the file
 * @returns Is file an image given the extension
 */
export const isNameImage = (fileName: string) =>
    /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(fileName);

/**
 * Get the extension from the file
 * @param fileName Name of the file
 * @returns Lowercased file extension without the .
 */
export const getExtension = (fileName: string) =>
    fileName.split(".").pop()?.toLowerCase();

/**
 * Iteratively get an item by a path
 * @param parent File system (should be root, but other folders can be used to narrow searches)
 * @param path Path of the item you want to find
 * @returns The item, if found
 */
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

/**
 * Get an item by a certain field (defaults to id)
 * Uses recursion
 * @param parent File system
 * @param id Internal property of a file you want to find (like the file's id)
 * @param field Internal value of a file you want to target (like "id")
 * @returns The item, if found
 */
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
