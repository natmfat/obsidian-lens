import { Store } from "../hooks/useStore.d";
import Folder from "./Folder";
import File from "./File";

const FileSystem = (props: Store["fileSystem"]) => {
    return (
        <>
            {props.children &&
                [...props.children]
                    .filter((item) => !item.name.startsWith("."))
                    .sort((itemA, itemB) =>
                        itemA.name.localeCompare(itemB.name)
                    )
                    .sort((itemA, itemB) =>
                        "children" in itemA && !("children" in itemB) ? -1 : 0
                    )
                    .map((child) => {
                        return child.children ? (
                            <Folder key={child.path} {...child} />
                        ) : (
                            <File key={child.path} {...child} />
                        );
                    })}
        </>
    );
};

export default FileSystem;
