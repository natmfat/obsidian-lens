import { Store, Folder } from "../hooks/useStore.d";

export const formatName = (fileName: string) => fileName.replace(".md", "");

export const getExtension = (fileName: string) =>
    fileName.split(".").pop()?.toLowerCase();

export const getItem = (
    parent: Folder,
    id: string
): ReturnType<Store["getItem"]> => {
    if (parent.id === id) {
        return parent;
    }

    for (const child of parent.children) {
        if (child.id === id) {
            return child;
        } else if ("children" in child) {
            const item = getItem(child, id);
            if (item) {
                return item;
            }
        }
    }

    return null;
};
