import type { Content, ElementContent, Root, RootContent } from "hast";
import replaceToArray from "string-replace-to-array";
import { map } from "unist-util-map";

const makeTransformer = () => {
    return (tree: Root) => {
        const mappedChilden = tree.children.map((child) =>
            map(child, (node: RootContent) => {
                if (node.type !== "text") {
                    return node;
                }

                const children = replaceToArray(
                    node.value,
                    /!?\[[^\]]*\]./,
                    (text) => ({
                        text,
                    })
                ).map<ElementContent>((segment: any) => {
                    if (typeof segment === "string") {
                        return {
                            type: "text",
                            value: segment,
                        };
                    } else if (segment.text) {
                        if (segment.text.startsWith("[[")) {
                            return {
                                type: "element",
                                tagName: "a",
                                properties: {
                                    href: segment.text,
                                },
                                children: [
                                    {
                                        type: "text",
                                        value: segment.text,
                                    },
                                ],
                            };
                        }

                        return {
                            type: "element",
                            tagName: "input",
                            properties: {
                                type: "checkbox",
                                checked: segment.text.trim() === "[x]",
                            },
                            children: [],
                        };
                    }

                    return {
                        type: "text",
                        value: segment,
                    };
                });

                // const children = replaceToArray(node.value, regex, (text) => ({
                //     emoji: text
                //   })).map<ElementContent>((segment) =>
                //     typeof segment === 'string'
                //       ? {
                //           type: 'text',
                //           value: segment
                //         } {
                //           type: 'element',
                //           tagName: 'img',
                //           properties: {
                //             className: [options.className],
                //             draggable: 'false',
                //             alt: segment.emoji,
                //             decoding: 'async',
                //             src: toUrl(segment.emoji, options)
                //           },
                //           children: []
                //         }
                //   );

                const result: Content = {
                    type: "element",
                    tagName: "span",
                    children,
                };

                return result;
            })
        );

        return {
            ...tree,
            children: mappedChilden,
        };
    };
};

export default makeTransformer;

// function makeTransformer(options: Options): Transformer<Root, Root> {
//     return (tree: Root) => {
//       const mappedChildren = tree.children.map(
//         (child) =>
//           map(child, (node: RootContent) => {

//             return result;
//           }) as RootContent
//       );

//       return {
//         ...tree,
//         children: mappedChildren
//       };
//     };
//   }
