import { IoChevronDown, IoChevronForward } from "react-icons/io5";
import { useState } from "react";

import { Folder as FolderProps } from "../hooks/useStore.d";
import FileSystem from "./FileSystem";
import useVault from "../hooks/useVault";

const Folder = (props: FolderProps) => {
    const [open, setOpen] = useState(false);
    useVault(props, props.path);

    return (
        <>
            <div
                className="item"
                onClick={() => {
                    setOpen(!open);
                }}
            >
                {open ? <IoChevronDown /> : <IoChevronForward />}
                {props.name}
            </div>
            <div className="pl-6 relative before:absolute before:left-3.5 before:h-full before:w-[1px] before:bg-slate-400">
                {open && <FileSystem {...props} />}
            </div>
        </>
    );
};

export default Folder;
