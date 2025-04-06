import dynamic from "next/dynamic";
import { useShallow } from "zustand/react/shallow";

import useStore from "../../hooks/useFileSystemStore";
import useGraphData from "../../hooks/useGraphData";
import { getItem } from "../../lib/fileSystem";

const ForceGraph2D = dynamic(
  async () => (await import("react-force-graph")).ForceGraph2D,
  {
    ssr: false,
  },
);

const AppGraph = () => {
  const data = useGraphData();
  const [fileSystem, setActive, setFocusedFile] = useStore(
    useShallow((state) => [
      state.fileSystem,
      state.setActive,
      state.setFocusedFile,
    ]),
  );

  return (
    <>
      <h1>Graph View</h1>
      <p>
        Explore your notes as a group of interconnected nodes. Click a node to
        open a new note.
      </p>
      <div className="h-96 rounded-md bg-slate-200 overflow-hidden border border-slate-300">
        {data && (
          <ForceGraph2D
            backgroundColor="rgb(226, 232, 240)"
            graphData={data}
            onNodeClick={(node) => {
              if (!(node && node.id)) return;

              // need an item
              const item = getItem(fileSystem, node.id as string);
              if (!item) return;
              setActive(item);
              setFocusedFile(item.path);
            }}
          />
        )}
      </div>
    </>
  );
};

export default AppGraph;
