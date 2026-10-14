# Multica for Raycast

Work with [Multica](https://multica.ai) issues, inbox, and agents from Raycast.

## Commands

| Command | What it does |
| --- | --- |
| **Search Issues** | Open issues grouped by status. Type to search every issue, including closed ones. |
| **Create Issue** | Title, description, status, priority, assignee (a teammate or an agent), and project. Warns you about likely duplicates. |
| **My Inbox** | Your notifications plus the open issues assigned to you. Mark read or unread (⇧⌘R), archive (⌃D), or open the issue. |
| **Agents & Runtimes** | Agent status and model, each agent's recent runs, and which runtimes are online. |

Each issue offers these actions:

| Action | Shortcut |
| --- | --- |
| Show details and comments | ↵ |
| Open in browser | ⌘↵ |
| Set status | ⌃S |
| Set priority | ⇧⌘P |
| Assign to me, an agent, or a teammate | ⇧⌘A |
| Add a comment | ⇧⌘M |
| Copy identifier | ⌥⌘C |
| Copy URL | ⇧⌘C |
| Copy as Markdown link | ⇧⌘L |
| Refresh | ⌘R |

If you belong to more than one workspace, use the dropdown in the search bar to switch. Every command remembers your choice.

## Authentication

By default the extension reuses the login from the Multica desktop app or the `multica` CLI. It reads the token from `~/.multica/config.json` or the most recently used profile in `~/.multica/profiles/`.

To set auth explicitly, open the extension preferences:

- **API Token**: a personal access token from Multica Settings → Tokens. If set, it overrides the local login.
- **CLI Profile**: which `~/.multica/profiles/<name>` to read.
- **API URL** and **Web App URL**: point the extension at a self-hosted Multica.

## Development

```bash
npm install
npm run dev
```

`npm run lint` and `npm run build` should both pass before you publish.
