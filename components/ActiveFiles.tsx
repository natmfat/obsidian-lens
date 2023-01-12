import useStore from "../hooks/useStore";
import ActiveFile from "./ActiveFile";

const ActiveFiles = () => {
    const [activeFiles, focusedFile] = useStore((state) => [
        state.activeFiles,
        state.focusedFile,
    ]);

    return (
        <div className="sticky pr-2 pl-1 py-2 flex items-center gap-2 top-0 left-0 right-0 bg-white w-full overflow-x-hidden z-50">
            {activeFiles.map((file) => (
                <ActiveFile
                    key={file.id}
                    id={file.id}
                    name={file.name}
                    selected={file.id === focusedFile}
                />
            ))}
        </div>
    );
};

export default ActiveFiles;
