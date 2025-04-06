import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Split from "react-split";

import Apps from "../components/Apps";
import FileContent from "../components/FileContent";
import FileSystemFull from "../components/FileSystemFull";
import Root from "../components/Root";
import { useFileSystem } from "../hooks/useFileSystemStore";
import { useKeyboard } from "../hooks/useKeyboard";
import VaultModel from "../schema/vault/model";

// TODO:
// Ctrl + file click = new item
// Click in left = change focused item, replace active with new item
// Ctrl + w = remove focused active item

export default function Dashboard({
  name,
  paths,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useFileSystem(name, paths);
  useKeyboard();

  return (
    <Root>
      <Split
        sizes={[20, 80]}
        direction="horizontal"
        className="flex"
        gutterSize={4}
      >
        <FileSystemFull />
        <FileContent />
      </Split>

      <Apps />
    </Root>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const vault = new VaultModel();
  (await vault.fetch()).disconnect();

  return {
    props: {
      name: vault.name,
      paths: vault.paths,
    },
  };
};
