import type { ViewerProps } from "./Viewer";

const ViewerImage = ({ data }: ViewerProps) => {
    return <img src={data.downloadUrl} className="max-w-full mx-auto" />;
};

export default ViewerImage;
