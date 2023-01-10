import { useState } from "react";
import useStore from "../hooks/useStore";
import { File as FileProps } from "../hooks/useStore.d";
import useVault from "../hooks/useVault";
import { formatName } from "../lib/fileSystem";
import LoadingIcon from "./LoadingIcon";

const File = (props: FileProps) => {
    const [open, setOpen] = useState(false);
    const [setActive, setFocusedFile] = useStore((state) => [
        state.setActive,
        state.setFocusedFile,
    ]);

    const { loading } = useVault(props, props.path, open);

    return (
        <div
            className="item"
            onClick={() => {
                setOpen(true);
                setActive(props);
                setFocusedFile(props.id);
            }}
        >
            <span>{formatName(props.name)}</span>
            {loading && <LoadingIcon />}
        </div>
    );
};

export default File;
