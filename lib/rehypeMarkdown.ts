import { Fragment, createElement } from "react";
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

const rehypeMarkdown = (markdown: string, fileSystemPaths: string[]) => {
  return (
    unified()
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
      // .use(rehypeObsidian)
      .use(rehypeKatex)
      .use(rehypeReact, {
        createElement,
        Fragment,
        components: {
          a: FileContentLink,
        },
      })
      .processSync(markdown).result
  );
};

export default rehypeMarkdown;
