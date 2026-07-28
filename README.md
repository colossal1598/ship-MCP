# ship-mcp

**The clean TypeScript starter for building MCP servers.** Zod-validated tools, unit tests, MCP Inspector wired up, one-command dev loop. Clone it, rename two strings, ship your server.

```bash
npx degit colossal1598/ship-MCP my-server && cd my-server && npm i && npm run dev
```

## Why this exists

Every MCP server starts with the same 90 minutes of setup: SDK wiring, stdio transport, schema validation, figuring out why `console.log` breaks the protocol (logs go to stderr — already handled here), and getting the Inspector attached. This repo is that 90 minutes, done properly, once.

## What's inside

- **`src/index.ts`** — server wiring: register tools, connect stdio transport. ~40 lines, no magic.
- **`src/tools.ts`** — tool logic decoupled from wiring so it's unit-testable. Two examples: `echo` (hello-world) and `fetch_json` (real async tool with error handling).
- **`src/tools.test.ts`** — Vitest tests that run without spawning the server.
- **`npm run inspect`** — opens the official MCP Inspector against your dev server.

## Quickstart

```bash
npm install
npm run dev        # run the server (stdio)
npm test           # unit tests
npm run inspect    # poke tools in the MCP Inspector UI
npm run build      # compile to dist/
```

### Use it from Claude Desktop / Claude Code

```json
{
  "mcpServers": {
    "my-server": {
      "command": "node",
      "args": ["/absolute/path/to/dist/index.js"]
    }
  }
}
```

## Add your own tool (30 seconds)

```ts
// src/tools.ts
export const greetInput = { name: z.string() };
export async function greet({ name }: { name: string }) {
  return { content: [{ type: "text" as const, text: `Hello, ${name}!` }] };
}

// src/index.ts
server.registerTool("greet", { description: "Greet someone", inputSchema: greetInput }, greet);
```

---

## Want to ship a *paid* MCP server?

Fewer than 5% of the 11,000+ MCP servers out there make money — not because the demand isn't there, but because the billing plumbing is genuinely annoying. **[Ship MCP Pro](https://payhip.com/b/FWSlg)** is this starter plus everything the free version deliberately leaves out:

- 🔑 **License-key gating** — Payhip & Gumroad license verification middleware; sell keys, server validates them
- 📊 **Usage metering + per-key rate limits** — free tier / paid tier out of the box
- 🌐 **Streamable HTTP transport** — deploy as a remote server (Docker + Railway/Fly guides included)
- ✅ **CI pipeline**, expanded test suite, production error handling
- 📣 **Launch kit** — the exact directory-submission checklist + listing templates that get servers 10x more installs

*One-time $49, MIT-licensed output, free updates.* → **[Get Ship MCP Pro](https://payhip.com/b/FWSlg)**

---

MIT © Argo Navis
