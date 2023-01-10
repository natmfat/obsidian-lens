import { IoChevronDown, IoChevronForward } from "react-icons/io5";
import { useState } from "react";

import { Folder as FolderProps } from "../hooks/useStore.d";
import FileSystem from "./FileSystem";
import useVault from "../hooks/useVault";
import LoadingIcon from "./LoadingIcon";

const Folder = (props: FolderProps) => {
    const [open, setOpen] = useState(false);
    const { loading } = useVault(props, props.path, open);

    return (
        <>
            <div
                className="item"
                onClick={() => {
                    setOpen(!open);
                }}
            >
                {open ? <IoChevronDown /> : <IoChevronForward />}
                <span>{props.name}</span>
                {loading && <LoadingIcon />}
            </div>
            <div className="pl-6 relative before:absolute before:left-3.5 before:h-full before:w-[1px] before:bg-slate-400">
                {open && <FileSystem {...props} />}
            </div>
        </>
    );
};

export default Folder;
