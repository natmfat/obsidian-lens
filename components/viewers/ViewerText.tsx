import { useEffect, useState } from "react";

import useFileContent from "../../hooks/useFileContent";
import useStore from "../../hooks/useStore";
import { formatName, getContent } from "../../lib/fileSystem";
import rehypeMarkdown from "../../lib/rehypeMarkdown";
import SkeletonItem from "../SkeletonItem";
import type { ViewerProps } from "./Viewer";

export const ViewerTextPreview = ({ content }: { content: string | null }) => {
  const fileSystemPaths = useStore((state) => state.fileSystemPaths);
  return (
    <div className="prose prose-slate">
      {content ? rehypeMarkdown(content, fileSystemPaths) : <SkeletonItem />}
    </div>
  );
};

const ViewerText = ({ data }: ViewerProps) => {
  const content = useFileContent(data.path);

  return (
    <article className="max-w-prose mx-auto overflow-x-hidden pb-10">
      <h1 className="text-4xl font-extrabold mb-2">{formatName(data.name)}</h1>
      <ViewerTextPreview content={content} />
    </article>
  );
};

export default ViewerText;
