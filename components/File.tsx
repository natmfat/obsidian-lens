import { File as FileProps } from "../hooks/useStore.d";

const File = (props: FileProps) => {
    return (
        <div className="item">
            <span>{props.name}</span>
        </div>
    );
};

export default File;
