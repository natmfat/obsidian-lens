import type { File } from "../../hooks/useStore.d";
import { isNameImage } from "../../lib/fileSystem";
import ViewerImage from "./ViewerImage";
import ViewerText from "./ViewerText";

export interface ViewerProps {
    data: File;
}

const Viewer = ({ data }: ViewerProps) => {
    if (isNameImage(data.name)) {
        return <ViewerImage data={data} />;
    } else if (data.ext === "md") {
        return <ViewerText data={data} />;
    }

    return (
        <p className="text-red-500">File of type {data.ext} not supported</p>
    );
};

export default Viewer;
