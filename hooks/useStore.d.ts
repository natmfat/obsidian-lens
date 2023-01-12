export interface Store {
    set: (fn: (state: Store) => void) => void;

    fileSystem: Folder;
    getItem: (id: string) => Folder | File | null;
    clearFileSystem: () => void;
    clearFolder: (id: string) => void;
    addChildren: (parentId: string, items: Children) => void;
    updateItem: (id: string, data: Partial<File | Folder>) => void;

    // simply save the file into memory
    // this works because we don't care if the fetched data is stale
    activeFiles: File[];
    setActive: (file: File) => void;
    removeActive: (id: string) => void;

    focusedFile: string | null | "none";
    setFocusedFile: (id: string | null) => void;
}

interface VirtualItem {
    name: string;
    path: string;
    url: string; // git url to retrieve
    id: string; // sha id
}

export interface Folder extends VirtualItem {
    children: (Folder | File)[];
}

export interface File extends VirtualItem {
    downloadUrl: string;
    ext: string; // file extensions
}
