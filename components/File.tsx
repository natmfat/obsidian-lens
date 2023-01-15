import useStore from "../hooks/useStore";
import { Item } from "../hooks/useStore.d";
import { formatName } from "../lib/fileSystem";
import LoadingIcon from "./LoadingIcon";

const File = (props: Item) => {
    const [setActive, focusedFile, setFocusedFile] = useStore((state) => [
        state.setActive,
        state.focusedFile,
        state.setFocusedFile,
    ]);

    return (
        <div
            className="item"
            onClick={() => {
                setActive(props);
                setFocusedFile(props.path);
            }}
        >
            <span>{formatName(props.name)}</span>
            {/* {loading && <LoadingIcon />} */}
        </div>
    );
};

export default File;
