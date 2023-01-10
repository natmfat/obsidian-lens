import { createElement, Fragment } from "react";
import { unified } from "unified";
import remarkHtml from "remark-html";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypePrism from "rehype-prism";
import rehypeReact from "rehype-react";

const markdownToReact = (markdown: string) => {
    return (
        unified()
            // .use(html)
            // .use(prism)
            .use(remarkParse)
            .use(remarkHtml)
            .use(remarkRehype)
            .use(rehypePrism)
            .use(rehypeReact, { createElement, Fragment })
            .processSync(markdown).result
    );
};

export default markdownToReact;
