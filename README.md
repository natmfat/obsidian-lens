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

## API Methods

Obsidian Viewer exposes a variety of routes to retrieve (not modify) files from your vault. They are briefly described below.

## Screenshots
