import { File as FileProps } from "../hooks/useStore.d";

const File = (props: FileProps) => {
    return (
        <div className="item">
            <span>{props.name.replace(".md", "")}</span>
        </div>
    );
};

export default File;
