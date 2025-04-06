import FileSystem from "../components/FileSystem";
import useStore from "../hooks/useFileSystemStore";

const FileSystemFull = () => {
  const fileSystem = useStore((state) => state.fileSystem);

  return (
    <aside className="p-4 bg-slate-200 h-screen w-fit overflow-y-auto">
      <h1 className="flex items-center mb-2 px-2 overflow-hidden">
        <span className="uppercase font-semibold text-sm whitespace-nowrap overflow-x-hidden text-ellipsis mr-2">
          {fileSystem.name}
        </span>
      </h1>
      <FileSystem {...fileSystem} />
    </aside>
  );
};
// TODO: animate presence

export default FileSystemFull;
