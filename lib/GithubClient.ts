import type { File, Folder, VirtualItem } from "../hooks/useStore.d";
import { createFileSystem, getExtension } from "./fileSystem";
import vaultConfig from "../vault.config.json";

export default class GithubClient {
    private accessToken: string;
    static config = vaultConfig;

    /**
     * Create a new client to interact with the GitHub API
     * @param accessToken Access token from Github OAuth
     */
    constructor(accessToken: string) {
        this.accessToken = accessToken;
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

    /**
     * Converts data fetched from GitHub into the Obsidian Viewer file system format
     * Intended to be used in another recursive method
     * @param items Data from GitHub
     * @param parent Parent path
     * @returns List of Obsidian Viewer compatible folders & files
     */
    private static parseTreeItems(
        items: Record<string, string>[],
        parent: string = ""
    ): (Folder | File)[] {
        return items.map((item) => {
            const virtualItem: VirtualItem = {
                name: item.path.split("/").pop() || item.path,
                url: item.url,
                id: item.sha,
                path: `${parent}/${item.path}`,
            };

            if (item.type === "blob") {
                return {
                    ...virtualItem,
                    ext: getExtension(item.path),
                    downloadUrl: `/api/vault?path=${virtualItem.path}&raw=true`,
                } as File;
            }

            return {
                ...virtualItem,
                children: [],
            } as Folder;
        });
    }

    /**
     * Recursively retrieves all of the files in the repository
     * @returns Entire file system
     */
    async fetchFileSystem() {
        const fetchSubTree = async (parent: Folder, path: string) => {
            const tree = GithubClient.parseTreeItems(
                (await this.fetch(path, true)).tree,
                parent.path
            );

            for (const child of tree) {
                parent.children.push(child);
                if ("children" in child) {
                    await fetchSubTree(child, child.url);
                }
            }

            return tree;
        };

        // every time we complete this operation, save it to the cache automagically
        return fetchSubTree(createFileSystem(), await this.fetchTreeUrl());
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

    /**
     * Get the tree URL for the main branch of the repository
     * @returns Tree url (used in fetchFileSystem recursively)
     */
    fetchTreeUrl() {
        // https://api.github.com/repos/:owner/:repo/branches/master
        return this.fetch("/branches/main").then(
            (json) => json["commit"]["commit"]["tree"]["url"]
        );
    }

    /**
     * Builds the api string based on the configuration of the vault
     */
    get api() {
        const baseUrl = "https://api.github.com/repos";
        return `${baseUrl}/${vaultConfig.vaultOwner}/${vaultConfig.vaultRepo}`;
    }

    /**
     * Appropriate headers to access scoped resources
     */
    get headers() {
        return {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${this.accessToken}`,
        };
    }
}
