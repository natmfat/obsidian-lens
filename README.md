# Obsidian Viewer

A free, self-hosted option for your personal Obsidian vaults. Obsidian viewer will work with any Obsidian vault on GitHub (including privated vaults if you setup the permissions correctly).

## Configuration

Edit the following files to get started

-   `vault.config.json`: Vault name & where it is located
-   `.env.local`: Credentials (currently required)

### Setting up Vault Config

If you vault is currently located at `https://github.com/nathan-pham/obsidian-vault`, you would write

```json
{
    "vaultName": "Programming Vault", // can be called anything
    "vaultOwner": "nathan-pham", // your GitHub username
    "vaultRepo": "obsidian-vault" // your GitHub repository path
}
```

### Setting up GitHub Credentials

An example is provided in `.env.example`.  
You could set the redirect URI to `http://localhost:3000/api/auth`, but recognize you will need to change it if you deploy Obsidian vault to the cloud.

```
GITHUB_CLIENT_SECRET=<app secret>
NEXT_PUBLIC_GITHUB_CLIENT_ID=<app client id>
NEXT_PUBLIC_GITHUB_REDIRECT_URI=<redirect url>
```

### Vault Cache

Obsidian Viewer can fetch all of your files in the browser, but the GitHub API may rate limit your requests. Ideally you should create a file system cache of every file in your current Obsidian vault. Think of it as saving all of your current vault files to the Obsidian Viewer directory (but amassed into a single JSON file.)

1. Set "logging" to true in `vault.config.json`
2. Sign into Obsidian Viewer and copy your access token printed into the console.
3. Run `cacheFileSystem.ts`. It will create `fileSystem.json`, which contains every file necessary for Obsidian Viewer to work.
4. Disable logging in the vault config.

TODO: Admin page

-   Check for updates
-   Save to external database (redis)
-   https://app.redislabs.com/#/subscriptions/subscription/1942103/bdb
-   Transition all APIs to use Redis

## API Methods

Obsidian Viewer exposes a variety of routes to retrieve (not modify) files from your vault. They are briefly described below.

## Screenshots
