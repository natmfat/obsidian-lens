import { useState } from "react";
import { IoChevronDown, IoChevronForward } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

import { Item } from "../hooks/useFileSystemStore";
import FileSystem from "./FileSystem";
import LoadingIcon from "./LoadingIcon";

const Folder = (props: Item) => {
  const [open, setOpen] = useState(false);

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
        {/* {loading && <LoadingIcon />} */}
      </div>
      <div className="pl-6 relative before:absolute before:left-3.5 before:h-full before:w-[1px] before:bg-slate-400">
        {/* {open && <FileSystem {...props} />} */}
        <div className={twMerge("hidden", open && "block")}>
          <FileSystem {...props} />
        </div>
      </div>
    </>
  );
};

export default Folder;
