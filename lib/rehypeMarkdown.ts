import { Fragment, createElement, useEffect, useState } from "react";
import production from "react/jsx-runtime";
import rehypeKatex from "rehype-katex";
import rehypePrism from "rehype-prism-plus";
import rehypeReact from "rehype-react";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
// @ts-ignore
import remarkLinks from "remark-wiki-link-plus";
import { unified } from "unified";

import FileContentLink from "../components/FileContentLink";
import { getContent, getItemPathFlat } from "./fileSystem";

export function useProcessor(
  content: string | null,
  fileSystemPaths: string[],
) {
  const [Content, setContent] = useState(createElement(Fragment));

  useEffect(() => {
    (async () => {
      if (!content) {
        return;
      }

      const file = await unified()
        .use(remarkParse)
        .use(remarkBreaks)
        .use(remarkGfm)
        .use(remarkMath)
        .use(remarkLinks, {
          pageResolver: (path: string) => [path],
          hrefTemplate: (path: string) => {
            const itemPath = getItemPathFlat(path, fileSystemPaths);
            if (itemPath) return getContent(itemPath);
            return path;
          },
        })
        .use(remarkRehype)
        .use(rehypePrism)
        .use(rehypeKatex)
        .use(rehypeReact, {
          ...production,
          components: {
            a: FileContentLink,
          },
        })
        .process(content);

      setContent(file.result);
    })();
  }, [content, fileSystemPaths]);

  return Content;
}
