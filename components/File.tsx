import { File as FileProps } from "../hooks/useStore.d";

const File = (props: FileProps) => {
    return <div className="item">{props.name}</div>;
};

export default File;
