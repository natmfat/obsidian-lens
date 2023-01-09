import create from "zustand";
import { immer } from "zustand/middleware/immer";

import { Store } from "./useStore.d";
import { getItem } from "../lib/fileSystem";
import vaultConfig from "../vault.config.json";

const root = "root";

const useStore = create(
    immer<Store>((set, get) => ({
        set: (fn) => set(fn),

        fileSystem: {
            name: vaultConfig.vaultName,
            url: root,
            id: root,
            path: root,
            children: [],
        },
        activeFiles: [],

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
    }))
);

export default useStore;
