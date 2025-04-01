import type { Content, ElementContent, Root, RootContent } from "hast";
import replaceToArray from "string-replace-to-array";
import { map } from "unist-util-map";

// TODO: custom components (tags, backlinks, images)
/*
images
    unset(Slimdown::$rules['/\[([^\[]+)\]\(([^\)]+)\)/']);
    Slimdown::add_rule('/!\[([^\[]+)\]\(([^\)]+)\)/', '<img src=\'\2\' alt=\'\1\'>');
    Slimdown::add_rule('/\[([^\[]+)\]\(([^\)]+)\)/', '<a href=\'\2\'>\1</a>');

backlinks
    Slimdown::add_rule ('/\[\[(.*?)\]\]/e', 'mywiki_internal_link (\'\\1\')');

tags
    test
*/

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
          (data) => ({ data }),
        ).map<ElementContent>((segment: any) => {
          if (typeof segment === "string") {
            return {
              type: "text",
              value: segment,
            };
          }

          return {
            type: "text",
            value: "<<" + segment.data + ">>",
          };
        });

        const result: Content = {
          type: "element",
          tagName: "span",
          children,
        };

        return result;
      }),
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
