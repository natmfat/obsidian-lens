import useVault from "../hooks/useVault";
import FileSystem from "../components/FileSystem";
import LoadingIcon from "./LoadingIcon";

const FileSystemFull = () => {
    const { fileSystem, loading } = useVault(undefined, undefined, true);

    return (
        <aside className="p-4 bg-slate-200 h-screen w-fit overflow-y-auto">
            <h1 className="flex items-center mb-2 px-2 overflow-hidden">
                <span className="uppercase font-semibold text-sm whitespace-nowrap overflow-x-hidden text-ellipsis mr-2">
                    {fileSystem.name}
                </span>
                {loading && <LoadingIcon />}
            </h1>
            <FileSystem {...fileSystem} />
        </aside>
    );
};
// TODO: animate presence

export default FileSystemFull;
