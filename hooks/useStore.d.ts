export interface Store {
    set: (fn: (state: Store) => void) => void;

    fileSystem: Item;
    getItem: (path: string) => Item | null;
    clearFileSystem: () => void;
    clearItem: (path: string) => void;
    addChildren: (path: string, items: Item[]) => void;
    updateItem: (path: string, data: Partial<Item>) => void;

    // simply save the file into memory
    // this works because we don't care if the fetched data is stale
    activeFiles: Item[];
    setActive: (file: Item) => void;
    removeActive: (path: string) => void;

    focusedFile: string | null | "none";
    setFocusedFile: (path: string | null) => void;
}

export interface Item {
    name: string;
    path: string;
    children?: Item[];
}
