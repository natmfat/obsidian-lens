import GithubClient, { defaultVault } from "../../lib/GithubClient";
import redis from "../../lib/database";
import { Resolvers, Vault } from "..";
import VaultModel from "./model";

export const Query: Resolvers["Query"] = {
    getVault: async () => {
        return (await new VaultModel().fetch()).serialize();
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
};
