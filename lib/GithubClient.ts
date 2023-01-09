import vaultConfig from "../vault.config.json";

export default class GitHubClient {
    private accessToken: string;
    static config = vaultConfig;

    constructor(accessToken: string) {
        this.accessToken = accessToken;
    }

    fetchContent(path: string = "") {
        return fetch(`${this.api}/contents${path ? "/" + path : ""}`, {
            method: "GET",
            headers: this.headers,
        }).then((res) => res.json());
    }

    fetchItems(sha: string) {
        return fetch(`${this.api}/git/commits/${sha}`, {
            method: "GET",
            headers: this.headers,
        }).then((res) => res.json());
    }

    fetchSHA() {
        return fetch(`${this.api}/commits?per_page=1`, {
            method: "GET",
            headers: this.headers,
        })
            .then((res) => res.json())
            .then((json) => json[0].sha);
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
