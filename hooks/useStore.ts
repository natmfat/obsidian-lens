import create from "zustand";
import { immer } from "zustand/middleware/immer";

import { Store } from "./useStore.d";
import { createFileSystem, getItem } from "../lib/fileSystem";

const useStore = create(
    immer<Store>((set, get) => ({
        set: (fn) => set(fn),

        fileSystem: createFileSystem(),
        fileSystemPaths: [],
        clearFileSystem: () =>
            set((state) => {
                state.fileSystem.children = [];
            }),
        getItem: (path) => {
            return getItem(get().fileSystem, path);
        },
        clearItem: (path) =>
            set((state) => {
                const item = getItem(state.fileSystem, path);
                if (item && "children" in item) {
                    item.children = [];
                }
            }),

        addChildren: (parentPath, children) =>
            set((state) => {
                const parent = getItem(state.fileSystem, parentPath);
                if (parent && parent.children) {
                    parent.children = parent.children.concat(children);
                }
            }),
        updateItem: (id, partialItem) =>
            set((state) => {
                const item = getItem(state.fileSystem, id);
                if (item) {
                    Object.assign(item, partialItem);
                }
            }),

        activeFiles: [],
        setActive: (file) => {
            set((state) => {
                let found = false;
                for (const activeFile of state.activeFiles) {
                    if (activeFile.path === file.path) {
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    state.activeFiles.push(file);
                }
            });
        },
        removeActive: (path) => {
            set((state) => {
                state.activeFiles = state.activeFiles.filter(
                    (activeFile) => activeFile.path !== path
                );
            });
        },

        focusedFile: null,
        setFocusedFile: (path) =>
            set((state) => {
                state.focusedFile = path;
            }),
    }))
);

export default useStore;
