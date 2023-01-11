import useStore from "../hooks/useStore";
import ActiveFile from "./ActiveFile";

const ActiveFiles = () => {
    const activeFiles = useStore((state) => state.activeFiles);

    return (
        <div className="pr-2 pl-1 py-2 flex items-center gap-2 absolute w-full overflow-x-hidden">
            {activeFiles.map((file) => (
                <ActiveFile key={file.id} id={file.id} name={file.name} />
            ))}
        </div>
    );
};

export default ActiveFiles;
