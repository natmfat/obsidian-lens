import { promises as fs } from "fs";
import { stdin as input, stdout as output } from "process";
import { promises as readline } from "readline";

import GithubClient from "./lib/GithubClient";
import { createFileSystem } from "./lib/fileSystem";

const getAccessToken = async () => {
  const rl = readline.createInterface({ input, output });
  const accessToken = await rl.question("GitHub Access Token > ");
  rl.close();

  return accessToken;
};

// Cache the entire file system ahead of time to lessen request load
// Use in conjunction with getItem & getItemByPath to serve files
(async () => {
  const client = new GithubClient(await getAccessToken());

  const children = await client.fetchFileSystem();
  const fileSystem = {
    ...createFileSystem(),
    children,
  };

  await fs.writeFile("./fileSystem.json", JSON.stringify(fileSystem));
})();
