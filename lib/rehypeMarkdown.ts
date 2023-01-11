import { createElement, Fragment } from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import remarkMath from "remark-math";
import rehypePrism from "rehype-prism-plus";
import rehypeKatex from "rehype-katex";
import rehypeReact from "rehype-react";

import rehypeObsidian from "./rehypeObsidian";

const rehypeMarkdown = (markdown: string) => {
    return (
        unified()
            // .use(html)
            // .use(prism)
            .use(remarkParse)
            .use(remarkBreaks)
            .use(remarkGfm)
            .use(remarkMath)
            .use(remarkRehype)
            .use(rehypePrism)
            .use(rehypeObsidian)
            .use(rehypeKatex)
            .use(rehypeReact, { createElement, Fragment })
            .processSync(markdown).result
    );
};

export default rehypeMarkdown;
