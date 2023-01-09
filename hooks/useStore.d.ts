export interface Store {
    set: (fn: (state: Store) => void) => void;

    fileSystem: Folder;
    activeFiles: File[];

    getItem: (id: string) => Folder | File | null;
    clearFileSystem: () => void;
    clearFolder: (id: string) => void;
    addChildren: (parentId: string, items: Children) => void;
}

interface VirtualItem {
    name: string;
    path: string;
    url: string; // git url to retrieve
    id: string; // sha id
}

type Children = (Folder | File)[];

export interface Folder extends VirtualItem {
    children: Children;
}

export interface File extends VirtualItem {
    content: string;
}
