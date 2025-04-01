import { ComponentPropsWithoutRef, useRef, useState } from "react";

import useFileContent from "../hooks/useFileContent";
import useKeyboard from "../hooks/useKeyboard";
import useStore from "../hooks/useStore";
import { getItem } from "../lib/fileSystem";
import Portal from "./Portal";
import { ViewerTextPreview } from "./viewers/ViewerText";

const LinkNormal = ({
  href,
  children,
  ...props
}: ComponentPropsWithoutRef<"a">) => (
  <a href={href} target="_blank" rel="noreferrer" {...props}>
    {children}
  </a>
);

const LinkFetch = ({
  href,
  children,
  ...props
}: ComponentPropsWithoutRef<"a">) => {
  // retrieve content path
  const content = useFileContent(href!, true);
  const path = useRef(
    new URL(href!, window.location.toString()).searchParams.get("path")!,
  );

  // on link click activate file
  const [fileSystem, setActive, setFocusedFile] = useStore((state) => [
    state.fileSystem,
    state.setActive,
    state.setFocusedFile,
  ]);

  // manage keyboard
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
        onClick={(e) => {
          e.preventDefault();

          const item = getItem(fileSystem, path.current);
          if (item) {
            setFocusedFile(path.current);
            setActive(item);
          }
        }}
        onMouseOver={(e) => {
          if (!keys.includes("Control")) {
            return;
          }

          // TODO: atm this is hardcoded because we know w-96 h-96
          // make it dynamic at some point
          const size = 384;

          setShow(true);
          setPos({
            x: e.clientX - (e.clientX + size > innerWidth ? size : 0),
            y:
              e.clientY + scrollY - (e.clientY + size > innerHeight ? size : 0),
          });
        }}
      >
        {children}
      </a>
      {show && (
        <Portal>
          <div
            className="fixed w-96 h-96 z-50 bg-white border shadow-lg overflow-y-auto p-4 rounded-sm"
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
        </Portal>
      )}
    </>
  );
};

const FileContentLink = ({
  href,
  children,
  ...props
}: ComponentPropsWithoutRef<"a">) => {
  // normal link
  if (href?.startsWith("http")) {
    return (
      <LinkNormal href={href} {...props}>
        {children}
      </LinkNormal>
    );
  }

  return (
    <LinkFetch href={href} {...props}>
      {children}
    </LinkFetch>
  );
};

export default FileContentLink;
