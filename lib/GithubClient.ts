import { z } from "zod";

import { Vault } from "../schema";
import { getExtension, getItemPathFlat, isFile } from "./fileSystem";
import { Result, err, ok, tryCatch } from "./tryCatch";

export type AccessToken = z.infer<typeof GithubClient.__ACCESS_TOKEN_SCHEMA>;

export const defaultVault: Vault = {
  owner: "natmfat",
  repo: "obsidian-vault",
  name: "Obsidian Vault",
  paths: [],
} as const;

export class GithubClient {
  private accessToken: string;
  private vaultOwner: string;
  private vaultRepo: string;

  /**
   * Create a new client to interact with the GitHub API
   * @param accessToken Access token from Github OAuth
   */
  constructor(accessToken: string, vaultOwner?: string, vaultRepo?: string) {
    this.accessToken = accessToken;
    this.vaultOwner = vaultOwner || defaultVault.owner;
    this.vaultRepo = vaultRepo || defaultVault.repo;
  }

  static __ACCESS_TOKEN_SCHEMA = z.object({
    access_token: z.string(),
    expires_in: z.number({ coerce: true }),
  });

  /**
   * Get the access token for a user
   * @param code Code returned from OAuth
   * @returns Access token
   */
  static async getAccessToken(code: string): Promise<Result<AccessToken>> {
    let [data, error] = await tryCatch(
      fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/vnd.github+json",
        },
        body: JSON.stringify({
          client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code: code,
        }),
      }).then((res) => res.json()),
    );
    if (error !== null) {
      return err("Failed to parse access token into JSON");
    }

    [data, error] = await tryCatch(
      GithubClient.__ACCESS_TOKEN_SCHEMA.parseAsync(data),
    );
    if (error !== null) {
      return err("JSON does not match expected access token schema");
    }

    return ok(data);
  }

  /**
   * Wrapper around the existing fetch to make requests with the appropriate headers
   * All urls are prefixed by an API string
   * @param path URL to request
   * @param override Forces fetch to use just the path (does not prefix with API string)
   * @returns JSON response from GitHub API
   */
  private fetch(path: string, override: boolean = false) {
    return fetch(override ? path : `${this.api}${path}`, {
      method: "GET",
      headers: this.headers,
    }).then((res) => res.json());
  }

  async fetchLinks(paths: string[]) {
    const links: Record<string, string[]> = {};

    for (const path of paths) {
      // must be a file
      if (!(isFile(path) && getExtension(path) === "md")) continue;

      // must have content
      const data = await this.fetchContent(path);
      if (!data.content) continue;

      const content = Buffer.from(data.content, "base64").toString();
      const matches = (content.match(/\[\[(.*?)\]\]/gm) || [])
        .map((match) =>
          match
            .substring(2, match.length - 2)
            .split("|")
            .shift(),
        )
        .filter((match) => match) as string[];

      // must have links
      if (!(matches && matches.length > 0)) continue;

      const linkRefs: string[] = [];
      for (const match of matches) {
        const item = getItemPathFlat(match, paths);
        item && linkRefs.push(item);
      }

      // finally save the references
      links[path] = linkRefs;
    }

    return links;
  }

  /**
   * Builds a list of all of the items in a given repository
   * Part of migration to Redis
   * @returns
   */
  async fetchFileSystem() {
    const children: string[] = [];

    const fetchSubTree = async (parentPath: string, path: string) => {
      const tree = (await this.fetch(path, true)).tree as Record<
        string,
        string
      >[];

      for (const item of tree) {
        const path = `${parentPath}/${item.path}`;
        if (!item.path.startsWith(".")) {
          children.push(path);
          if (item.type === "tree") {
            await fetchSubTree(path, item.url);
          }
        }
      }
    };

    const [data, error] = await this.fetchTreeUrl();
    if (error !== null) {
      throw new Error("ok");
    }

    await fetchSubTree("", data);
    return children;
  }

  /**
   * Get the content or data associated with a given path
   * @param path Path to file (relative to the repository)
   * @returns JSON data of content
   */
  fetchContent(path: string = "") {
    return this.fetch(`/contents${path ? "/" + path : ""}`);
  }

  /**
   * Legacy code
   * Get the commit data associated with a given SHA (trees are easier to work with)
   * @param sha SHA (obtained from other GithubClient methods)
   * @returns JSON data of the commit
   */
  fetchItems(sha: string) {
    return this.fetch(`/git/commits/${sha}`);
  }

  static __TREE_URL_SCHEMA = z.object({
    commit: z.object({
      commit: z.object({
        tree: z.object({
          url: z.string(),
        }),
      }),
    }),
  });

  /**
   * Get the tree URL for the main branch of the repository
   * @returns Tree url (used in fetchFileSystem recursively)
   *
   * https://api.github.com/repos/:owner/:repo/branches/master
   */
  async fetchTreeUrl(): Promise<Result<string>> {
    let [data, error] = await tryCatch(this.fetch("/branches/main"));
    if (error !== null) {
      return err("Failed to fetch branch");
    }
    [data, error] = await tryCatch(
      GithubClient.__TREE_URL_SCHEMA.parseAsync(data),
    );
    if (error !== null) {
      return err("JSON does not match expected tree url schema");
    }

    return ok(data["commit"]["commit"]["tree"]["url"]);
  }

  /**
   * Builds the api string based on the configuration of the vault
   */
  get api() {
    return `https://api.github.com/repos/${this.vaultOwner}/${this.vaultRepo}`;
  }

  /**
   * Appropriate headers to access scoped resources
   */
  get headers() {
    return {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${this.accessToken}`,
      "X-GitHub-Api-Version": "2022-11-28",
    };
  }
}
