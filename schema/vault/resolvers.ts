import type { Resolvers } from "..";
import GithubClient from "../../lib/GithubClient";
import createRedis from "../../lib/createRedis";
import VaultModel from "./model";

export const Query: Resolvers["Query"] = {
    getVault: async () => {
        return (await new VaultModel().fetch()).serialize();
    },
    getVaultLinks: async () => {
        const links: Record<string, string[]> = {};
        const redis = createRedis();

        // fetch links
        const keys = await redis.keys("path:*");
        const pl = redis.multi();
        keys.forEach((key) => pl.lrange(key, 0, -1));

        const refsArray = (await pl.exec())?.map((row) => row[1]) as string[][];
        console.log(refsArray[0]);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const refs = refsArray[i];
            links[key.substring(5)] = refs;
        }

        redis.disconnect();
        return links;
    },
};

export const Mutation: Resolvers["Mutation"] = {
    updateVault: async (_, { owner, repo, name }) => {
        const vault = new VaultModel(owner, repo, name);
        await vault.push();
        return (await vault.fetch()).serialize();
    },
    updateVaultPaths: async (_, params, { accessToken }) => {
        const vault = new VaultModel();
        await vault.fetch();

        // update paths
        const client = new GithubClient(accessToken, vault.owner, vault.repo);
        const paths = await client.fetchFileSystem();
        vault.paths = paths;
        await vault.push();

        return vault.serialize();
    },
    updateVaultLinks: async (_, params, { accessToken }) => {
        const vault = new VaultModel();
        await vault.fetch();

        // update path links
        const client = new GithubClient(accessToken, vault.owner, vault.repo);
        const links = await client.fetchLinks(vault.paths);

        // save path links to redis
        const redis = createRedis();
        const pl = redis.multi();
        for (const path in links) {
            const prefixedPath = `path:${path}`;
            pl.del(prefixedPath).rpush(prefixedPath, ...links[path]);
        }

        await pl.exec();
        redis.disconnect();
        return links;
    },
};
