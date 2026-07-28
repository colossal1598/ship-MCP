#!/usr/bin/env node
import { StdioServerTransport } from "@modelcontextprotocol/server/stdio";
import { McpServer } from "@modelcontextprotocol/server";
import { echo, echoInput, fetchJson, fetchJsonInput } from "./tools.js";

const server = new McpServer({
  name: "ship-mcp",
  version: "0.2.1",
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
