import type { Item } from "../../hooks/useStore.d";
import { getExtension, isNameImage } from "../../lib/fileSystem";
import ViewerImage from "./ViewerImage";
import ViewerText from "./ViewerText";

export interface ViewerProps {
  data: Item;
}

const Viewer = ({ data }: ViewerProps) => {
  const ext = getExtension(data.name);
  if (isNameImage(data.name)) {
    return <ViewerImage data={data} />;
  } else if (ext === "md") {
    return <ViewerText data={data} />;
  }

  return <p className="text-red-500">File of type {ext} not supported</p>;
};

export default Viewer;
