import { createElement, Fragment } from "react";
import { unified } from "unified";
import remarkHtml from "remark-html";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypePrism from "rehype-prism";
import rehypeReact from "rehype-react";

import rehypeObsidian from "./rehypeObsidian";

const rehypeMarkdown = (markdown: string) => {
    return (
        unified()
            // .use(html)
            // .use(prism)
            .use(remarkParse)
            .use(remarkHtml)
            .use(remarkRehype)
            // .use(rehypeObsidian)
            .use(rehypePrism)
            .use(rehypeReact, { createElement, Fragment })
            .processSync(markdown).result
    );
};

export default rehypeMarkdown;
