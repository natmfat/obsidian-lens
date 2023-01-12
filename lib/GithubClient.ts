import type { File, Folder, VirtualItem } from "../hooks/useStore.d";
import { createFileSystem, getExtension } from "./fileSystem";
import vaultConfig from "../vault.config.json";

export default class GitHubClient {
    private accessToken: string;
    static config = vaultConfig;

    constructor(accessToken: string) {
        this.accessToken = accessToken;
    }

    private fetch(path: string, override: boolean = false) {
        return fetch(override ? path : `${this.api}${path}`, {
            method: "GET",
            headers: this.headers,
        }).then((res) => res.json());
    }

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

    async fetchFileSystem() {
        const fetchSubTree = async (parent: Folder, path: string) => {
            const tree = GitHubClient.parseTreeItems(
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

        return fetchSubTree(createFileSystem(), await this.fetchTreeUrl());
    }

    fetchContent(path: string = "") {
        return this.fetch(`/contents${path ? "/" + path : ""}`);
    }

    fetchItems(sha: string) {
        return this.fetch(`/git/commits/${sha}`);
    }

    fetchTreeUrl() {
        // https://api.github.com/repos/:owner/:repo/branches/master
        return this.fetch("/branches/main").then(
            (json) => json["commit"]["commit"]["tree"]["url"]
        );
    }

    get api() {
        const baseUrl = "https://api.github.com/repos";
        return `${baseUrl}/${vaultConfig.vaultOwner}/${vaultConfig.vaultRepo}`;
    }

    get headers() {
        return {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${this.accessToken}`,
        };
    }
}
