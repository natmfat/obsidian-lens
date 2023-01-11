import { IoClose } from "react-icons/io5";

import useStore from "../hooks/useStore";
import { formatName } from "../lib/fileSystem";

interface ActiveFileProps {
    id: string;
    name: string;
}

const ActiveFile = ({ id, name }: ActiveFileProps) => {
    const [removeActive, setFocusedFile] = useStore((state) => [
        state.removeActive,
        state.setFocusedFile,
    ]);

    return (
        <div
            onClick={() => {
                setFocusedFile(id);
            }}
            className="bg-slate-200 py-0.5 px-2 text-sm rounded-sm flex items-center gap-2 cursor-pointer select-none flex-shrink overflow-hidden justify-between"
        >
            <span className="whitespace-nowrap max-w-full overflow-x-hidden text-ellipsis">
                {formatName(name)}
            </span>

            <div
                className="grid items-center flex-shrink-0"
                onClick={(e) => {
                    removeActive(id);
                    setFocusedFile(null);
                    e.stopPropagation();
                    e.preventDefault();
                }}
            >
                <IoClose />
            </div>
        </div>
    );
};

export default ActiveFile;
