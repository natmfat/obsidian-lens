# Obsidian Lens

WARNING: CURRENTLY IN A NONFUNCTIONAL STATE

A free, self-hosted option for your personal Obsidian vaults. Obsidian Lens will work with any Obsidian vault on GitHub (including privated vaults if you setup the permissions correctly).

## Configuration

Create a `.env` to get started. An example is provided in `.env.example`.

- Create a GitHub app with a callback URL to `http://localhost:3000/api/login`. Eventually you will need to change these if you deploy Obsidian vault to the cloud.
- You can create a free [Redis account](http://redis.com); the base image has a limit of 30mb which is more than enough to store file paths and names.

### Vault Cache

Obsidian Lens can fetch all of your files in the browser, but the GitHub API may rate limit your requests. Ideally you should create a file system cache of every file in your current Obsidian vault. You can request a vault update through GraphQL or through the settings interface.

## API Methods

Obsidian Lens exposes a variety of routes to retrieve (not modify) files from your vault. They are briefly described below.

- `/api/login`: Used internally to obtain the GitHub access token (redirect URI should point here)
- `/api/logout`: Clears GitHub access token and returns you to home
- `/api/vault?path=<path>&raw=true`: Request a file resource by path
- `/api/graphql`: Cache file paths and connections to Redis (among other things)

## Screenshots

![Login Page](/screenshots/Screen%20Shot%202023-01-17%20at%208.48.53%20AM.png)
![Vault View](/screenshots/Screen%20Shot%202023-01-17%20at%208.51.20%20AM.png)
