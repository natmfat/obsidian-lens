import { useRef } from "react";
import { twMerge } from "tailwind-merge";

// Configure variations
const widths = ["w-2/12", "w-1/12", "w-6/12", "w-4/12", "w-4/12"];
const colors = ["bg-slate-200", "bg-slate-300"];

const SkeletonItem = () => {
    const items = useRef(
        new Array(Math.floor(Math.random() * 40) + 10).fill(0)
    );

    return (
        <div className="flex flex-wrap gap-2">
            {items.current.map((_, i) => (
                <div
                    key={i}
                    className={twMerge(
                        "h-2 bg-slate-200 rounded-full animate-pulse flex-shrink",
                        widths[Math.floor(Math.random() * widths.length)],
                        colors[Math.floor(Math.random() * colors.length)]
                    )}
                ></div>
            ))}
        </div>
    );
};

export default SkeletonItem;
