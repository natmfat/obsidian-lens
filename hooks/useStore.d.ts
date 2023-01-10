export interface Store {
    set: (fn: (state: Store) => void) => void;

    fileSystem: Folder;
    getItem: (id: string) => Folder | File | null;
    clearFileSystem: () => void;
    clearFolder: (id: string) => void;
    addChildren: (parentId: string, items: Children) => void;
    setContent: (id: string, content: string, ext?: string) => void;

    // simply save the file into memory
    // this works because we don't care if the content is stale
    activeFiles: File[];
    setActive: (file: File) => void;
    removeActive: (id: string) => void;

    focusedFile: string | null;
    setFocusedFile: (id: string) => void;
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
    ext: string; // file extensions
}
