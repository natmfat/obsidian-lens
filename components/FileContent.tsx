import { IoClose } from "react-icons/io5";
import useStore from "../hooks/useStore";
import { File } from "../hooks/useStore.d";
import { formatName, getItem } from "../lib/fileSystem";
import markdownToReact from "../lib/markdownToReact";
import markdownToHtml from "../lib/markdownToReact";

const FileContent = () => {
    const [fileSystem, activeFiles, focusedFile, setFocusedFile] = useStore(
        (state) => [
            state.fileSystem,
            state.activeFiles,
            state.focusedFile,
            state.setFocusedFile,
        ]
    );

    const data = focusedFile && (getItem(fileSystem, focusedFile) as File);
    // TODO: separate active top bar into separate component
    return (
        <div className="h-screen w-full px-1 overflow-y-auto">
            <div className="py-2 flex items-center gap-2">
                {activeFiles.map((file) => (
                    <div
                        key={file.id}
                        className="bg-slate-200 py-0.5 px-2 rounded-sm flex items-center gap-2 cursor-pointer select-none"
                    >
                        <span className="text-sm">{formatName(file.name)}</span>
                        <IoClose className="text-md" />
                    </div>
                ))}
            </div>
            {data ? (
                <article className="mt-10 max-w-3xl mx-auto overflow-x-hidden">
                    <h1 className="text-xl font-semibold mb-2">
                        {formatName(data.name)}
                    </h1>
                    <div className="prose">
                        {markdownToReact(
                            Buffer.from(data.content, "base64").toString()
                        )}
                    </div>
                    <footer className="h-10"></footer>
                </article>
            ) : (
                <div className="h-full grid place-items-center">
                    <h1 className="text-xl font-semibold mb-2 text-center">
                        No file is open
                    </h1>
                </div>
            )}
        </div>
    );
};

export default FileContent;

// export default async function markdownToHtml(markdown) {
//   const result = await remark().use(html).use(prism).process(markdown);
//   return result.toString();
// }
