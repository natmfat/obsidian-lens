import { createElement, Fragment } from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import remarkMath from "remark-math";
// @ts-ignore
import remarkLinks from "remark-wiki-link-plus";
import rehypePrism from "rehype-prism-plus";
import rehypeKatex from "rehype-katex";
import rehypeReact from "rehype-react";

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
            .use(rehypeReact, { createElement, Fragment })
            .processSync(markdown).result
    );
};

export default rehypeMarkdown;
