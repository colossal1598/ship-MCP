#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { echo, echoInput, fetchJson, fetchJsonInput } from "./tools.js";

const server = new McpServer({
  name: "ship-mcp",
  version: "0.1.0",
});

server.registerTool(
  "echo",
  {
    title: "Echo",
    description: "Echo a message back — the hello-world of MCP tools.",
    inputSchema: echoInput,
  },
  echo,
);

server.registerTool(
  "fetch_json",
  {
    title: "Fetch JSON",
    description: "Fetch a JSON payload from an HTTPS URL and return it prettified.",
    inputSchema: fetchJsonInput,
  },
  fetchJson,
);

const transport = new StdioServerTransport();
await server.connect(transport);
// stdio transport: logs must go to stderr, never stdout.
console.error("ship-mcp server running on stdio");
