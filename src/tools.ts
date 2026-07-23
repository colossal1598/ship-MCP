import { z } from "zod";

/**
 * Tool definitions live here, decoupled from the server wiring so they are
 * trivially unit-testable. Each entry maps 1:1 to server.registerTool().
 */

export const echoInput = { message: z.string().describe("Text to echo back") };

export async function echo({ message }: { message: string }) {
  return {
    content: [{ type: "text" as const, text: `Echo: ${message}` }],
  };
}

export const fetchJsonInput = {
  url: z.string().url().describe("HTTPS URL returning JSON"),
};

export async function fetchJson({ url }: { url: string }) {
  if (!url.startsWith("https://")) {
    return {
      isError: true,
      content: [{ type: "text" as const, text: "Only https:// URLs are allowed." }],
    };
  }
  const res = await fetch(url, { headers: { accept: "application/json" } });
  if (!res.ok) {
    return {
      isError: true,
      content: [{ type: "text" as const, text: `Request failed: HTTP ${res.status}` }],
    };
  }
  const body = await res.json();
  return {
    content: [{ type: "text" as const, text: JSON.stringify(body, null, 2).slice(0, 50_000) }],
  };
}
