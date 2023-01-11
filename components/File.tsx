import useStore from "../hooks/useStore";
import { File as FileProps } from "../hooks/useStore.d";
import useVault from "../hooks/useVault";
import { formatName } from "../lib/fileSystem";
import LoadingIcon from "./LoadingIcon";

const File = (props: FileProps) => {
    const [setActive, focusedFile, setFocusedFile] = useStore((state) => [
        state.setActive,
        state.focusedFile,
        state.setFocusedFile,
    ]);

    const { loading } = useVault(props, props.path, focusedFile === props.id);

    return (
        <div
            className="item"
            onClick={() => {
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
