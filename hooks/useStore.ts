import create from "zustand";
import { immer } from "zustand/middleware/immer";

import { Store } from "./useStore.d";
import { createFileSystem, getItem } from "../lib/fileSystem";

const useStore = create(
    immer<Store>((set, get) => ({
        set: (fn) => set(fn),

        fileSystem: createFileSystem(),
        clearFileSystem: () =>
            set((state) => {
                state.fileSystem.children = [];
            }),
        clearFolder: (id) =>
            set((state) => {
                const item = getItem(state.fileSystem, id);
                if (item && "children" in item) {
                    item.children = [];
                }
            }),
        getItem: (id) => {
            return getItem(get().fileSystem, id);
        },
        addChildren: (parentId, children) =>
            set((state) => {
                const parent = getItem(state.fileSystem, parentId);
                if (parent && "children" in parent) {
                    parent.children = parent.children.concat(children);
                }
            }),
        updateItem: (id, partialItem) =>
            set((state) => {
                const item = getItem(state.fileSystem, id);
                item && Object.assign(item, partialItem);
            }),

        activeFiles: [],
        setActive: (file) => {
            set((state) => {
                let found = false;
                for (const activeFile of state.activeFiles) {
                    if (activeFile.id === file.id) {
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    state.activeFiles.push(file);
                }
            });
        },
        removeActive: (id) => {
            set((state) => {
                state.activeFiles = state.activeFiles.filter(
                    (activeFile) => activeFile.id !== id
                );
            });
        },

        focusedFile: null,
        setFocusedFile: (id) =>
            set((state) => {
                state.focusedFile = id;
            }),
    }))
);

export default useStore;
