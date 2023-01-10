import { twMerge } from "tailwind-merge";

const SkeletonItem = () => {
    const items = new Array(Math.floor(Math.random() * 9) + 1).fill(0);
    const widths = ["w-10/12", "w-6/12", "w-8/12", "w-4/12", ""];
    return (
        <>
            {items.map((_, i) => (
                <div
                    key={i}
                    className={twMerge(
                        "h-5 bg-slate-300 rounded-sm animate-pulse mt-0.5",
                        widths[Math.floor(Math.random() * widths.length)]
                    )}
                ></div>
            ))}
        </>
    );
};

export default SkeletonItem;
