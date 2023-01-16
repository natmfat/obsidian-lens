import { IoClose } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

import useStore from "../hooks/useStore";
import { formatName } from "../lib/fileSystem";

interface ActiveFileProps {
    path: string;
    name: string;
    selected?: boolean;
}

const ActiveFile = ({ path, name, selected }: ActiveFileProps) => {
    const [removeActive, setFocusedFile, setFocusedNearby] = useStore(
        (state) => [
            state.removeActive,
            state.setFocusedFile,
            state.setFocusedNearby,
        ]
    );

    return (
        <div
            onClick={() => {
                setFocusedFile(path);
            }}
            className={twMerge(
                "bg-slate-200 py-0.5 px-2 text-sm rounded-sm flex items-center gap-2 cursor-pointer select-none flex-shrink overflow-hidden justify-between border",
                selected && "border-slate-400"
            )}
        >
            <span className="whitespace-nowrap max-w-full overflow-x-hidden text-ellipsis">
                {formatName(name)}
            </span>

            <div
                className="grid items-center flex-shrink-0"
                onClick={(e) => {
                    setFocusedNearby();
                    removeActive(path);

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
