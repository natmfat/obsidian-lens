import { getContent } from "../../lib/fileSystem";
import type { ViewerProps } from "./Viewer";

const ViewerImage = ({ data }: ViewerProps) => {
  return <img src={getContent(data.path)} className="max-w-full mx-auto" />;
};

export default ViewerImage;
