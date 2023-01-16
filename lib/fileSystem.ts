import type { Store, Item } from "../hooks/useStore.d";

/**
 * Create an empty file system (basically a folder without a parent)
 * @returns Empty file system
 */
export const createFileSystem = (): Item => ({
    name: "Unnamed Vault",
    path: "/",
    children: [],
});

export const getContent = (path: string) =>
    `/api/vault?path=${encodeURIComponent(path)}&raw=true`;

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
export const getItemByPath = (parent: Item, path: string) => {
    const pathComponents = path
        .split("/")
        .map((t) => t.trim())
        .filter((t) => t.length);

    let currentItem: Item = parent;
    while (pathComponents.length && currentItem.children) {
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
 * Get an item by a certain field (defaults to path)
 * Uses recursion
 * @param parent File system
 * @param path Internal property of a file you want to find (like the file's path)
 * @param field Internal value of a file you want to target (like "path")
 * @returns The item, if found
 */
export const getItem = (
    parent: Item,
    path: string,
    field?: keyof Item
): ReturnType<Store["getItem"]> => {
    if (parent.path === path) {
        return parent;
    }

    if (!parent.children) return null;

    for (const child of parent.children) {
        if (child[field || "path"] === path) {
            return child;
        } else if ("children" in child) {
            const item = getItem(child, path, field);
            if (item) {
                return item;
            }
        }
    }

    return null;
};

export const getItemPathFlat = (targetPath: string, paths: string[]) => {
    for (const path of paths) {
        const fileName = path.split("/").pop();

        if (
            path === targetPath ||
            fileName === targetPath ||
            fileName === targetPath + ".md"
        ) {
            return path;
        }
    }

    return targetPath;
};

/**
 * Utility to determine if a path is a file (if it has a dot or not)
 * @param path File path
 * @returns Is it a file
 */
export const isFile = (path: string) => path.split(".").length > 1;

/**
 * Build a client compatible file system
 * @param paths Flattened list of paths
 * @returns Entire Obsidian vault file system
 */
export const buildFileSystem = (paths: string[]): Item => {
    const cache: Record<string, any> = { children: [] };
    for (const path of paths) {
        const components = path
            .split("/")
            .map((p) => p.trim())
            .filter((p) => p.length);

        components.reduce((acc: Record<string, any>, name: string) => {
            if (!acc.hasOwnProperty(name)) {
                acc[name] = { children: [] };

                const item = { name, path } as Item;
                acc.children.push(
                    isFile(name)
                        ? item
                        : {
                              ...item,
                              children: acc[name].children,
                          }
                );
            }

            return acc[name];
        }, cache);
    }

    return {
        ...createFileSystem(),
        children: cache.children,
    };
};
