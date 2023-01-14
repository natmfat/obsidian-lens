import { Vault } from "..";
import { defaultVault } from "../../lib/GithubClient";
import redis from "../../lib/database";

export default class VaultModel implements Vault {
    owner: string = defaultVault.owner!;
    repo: string = defaultVault.repo!;
    name: string = defaultVault.name!;
    paths: string[] = [];

    constructor(owner?: string, repo?: string, name?: string) {
        owner && (this.owner = owner);
        repo && (this.repo = repo);
        name && (this.name = name);
    }

    async push() {
        const pl = redis.multi();
        pl.set("owner", this.owner)
            .set("repo", this.repo)
            .set("name", this.name);

        // update paths only if we have them
        if (this.paths.length > 0) {
            pl.del("paths").rpush("paths", ...this.paths);
        }

        await pl.exec();

        return this;
    }

    async fetch() {
        const keys = ["owner", "repo", "name"];
        const values = await redis.mget(keys);
        for (let i = 0; i < values.length; i++) {
            const key = keys[i];
            const value = values[i];
            if (value) {
                (<any>this)[key] = value;
            }
        }

        // fetch paths
        this.paths = await redis.lrange("paths", 0, -1);
        return this;
    }

    serialize() {
        return {
            owner: this.owner,
            repo: this.repo,
            name: this.name,
            paths: this.paths,
        } as Vault;
    }
}
