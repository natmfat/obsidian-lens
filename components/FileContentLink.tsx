import { ComponentPropsWithoutRef, useRef, useState } from "react";
import useFileContent from "../hooks/useFileContent";
import useKeyboard from "../hooks/useKeyboard";
import FileContent from "./FileContent";
import Portal from "./Portal";
import { ViewerTextPreview } from "./viewers/ViewerText";

const FileContentLink = ({
    href,
    children,
    ...props
}: ComponentPropsWithoutRef<"a">) => {
    if (href?.startsWith("http")) {
        return (
            <a href={href} {...props}>
                {children}
            </a>
        );
    }

    const url = useRef(new URL(href!, window.location.toString()));
    const content = useFileContent(url.current.searchParams.get("path")!);

    const keys = useKeyboard((state) => state.keys);
    const [show, setShow] = useState(false);
    const [pos, setPos] = useState({
        x: 0,
        y: 0,
    });

    return (
        <>
            <a
                href={href}
                {...props}
                onMouseOver={(e) => {
                    if (keys.includes("Control")) {
                        setShow(true);
                        setPos({
                            x: e.clientX,
                            y: e.clientY,
                        });
                    }
                }}
            >
                {children}
            </a>
            <Portal>
                {show && (
                    <div
                        className="fixed w-96 h-96 z-10 bg-white border shadow-lg overflow-y-auto p-4 rounded-sm"
                        style={{
                            left: `${pos.x}px`,
                            top: `${pos.y}px`,
                        }}
                        onMouseLeave={() => {
                            setShow(false);
                        }}
                    >
                        <ViewerTextPreview content={content} />
                    </div>
                )}
            </Portal>
        </>
    );
};

export default FileContentLink;
