import { useEffect } from "react";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { buildFileSystem, createFileSystem, getItem } from "../lib/fileSystem";

type State = {
  fileSystem: Item;
  fileSystemPaths: string[];
  activeFiles: Item[];

  focusedFile: string | null | "none";
};

type Actions = {
  set: (fn: (state: Store) => void) => void;

  setInitialStore: (name: string, paths: string[]) => void;

  getItem: (path: string) => Item | null;
  clearFileSystem: () => void;
  clearItem: (path: string) => void;
  addChildren: (path: string, items: Item[]) => void;
  updateItem: (path: string, data: Partial<Item>) => void;

  // simply save the file into memory
  // this works because we don't care if the fetched data is stale
  setActive: (file: Item) => void;
  removeActive: (path: string) => void;

  setFocusedFile: (path: string | null) => void;
  setFocusedNearby: () => void;
};

export type Store = State & Actions;

export type Item = {
  name: string;
  path: string;
  children?: Item[]; // if it is a folder it can contain other notes
  refs?: string[]; // references to other notes
};

const useStore = create<Store>()(
  immer((set, get) => ({
    set: (fn) => set(fn),

    setInitialStore: (name, paths) => {
      set((state) => {
        state.fileSystem = buildFileSystem(paths);
        state.fileSystem.name = name;
        state.fileSystemPaths = paths;
      });
    },

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
          (activeFile) => activeFile.path !== path,
        );
      });
    },

    focusedFile: null,
    setFocusedFile: (path) =>
      set((state) => {
        state.focusedFile = path;
      }),
    setFocusedNearby: () =>
      set((state) => {
        const idx = state.activeFiles.findIndex(
          (file) => file.path === state.focusedFile,
        );

        state.focusedFile =
          state.activeFiles[idx - 1]?.path ||
          state.activeFiles[idx + 1]?.path ||
          null;
      }),
  })),
);

export default useStore;

export const useFileSystem = (name: string, paths: string[]) => {
  const setInitialStore = useStore((state) => state.setInitialStore);
  useEffect(() => {
    setInitialStore(name, paths);
  }, []);
};
