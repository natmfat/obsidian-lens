import { useRef } from "react";
import { useShallow } from "zustand/react/shallow";

import useStore from "../hooks/useFileSystemStore";
import { Item } from "../hooks/useFileSystemStore";
import { formatName, getExtension } from "../lib/fileSystem";

const File = (props: Item) => {
  const [setActive, setFocusedFile] = useStore(
    useShallow((state) => [state.setActive, state.setFocusedFile]),
  );

  const ext = useRef(getExtension(props.name));

  return (
    <div
      className="item"
      onClick={() => {
        setActive(props);
        setFocusedFile(props.path);
      }}
    >
      <span>
        {formatName(props.name)}{" "}
        {ext.current !== "md" && (
          <span className="uppercase text-xs px-1 py-0.5 rounded-sm bg-slate-300">
            {ext.current}
          </span>
        )}
      </span>
    </div>
  );
};

export default File;
