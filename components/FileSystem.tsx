import { Store } from "../hooks/useStore.d";
import Folder from "./Folder";
import File from "./File";

const FileSystem = (props: Store["fileSystem"]) => {
    return (
        <>
            {[...props.children]
                .filter((item) => !item.name.startsWith("."))
                .sort((itemA, itemB) => itemA.name.localeCompare(itemB.name))
                .sort((itemA, itemB) =>
                    "children" in itemA && !("children" in itemB) ? -1 : 0
                )
                .map((child) => {
                    if ("children" in child) {
                        return <Folder key={child.id} {...child} />;
                    }

                    return <File key={child.id} {...child} />;
                })}
        </>
    );
};

export default FileSystem;
