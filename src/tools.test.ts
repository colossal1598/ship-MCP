import { describe, expect, it } from "vitest";
import { echo, fetchJson } from "./tools.js";

describe("echo", () => {
  it("echoes the message", async () => {
    const result = await echo({ message: "hi" });
    expect(result.content[0].text).toBe("Echo: hi");
  });
});

describe("fetch_json", () => {
  it("rejects non-https URLs", async () => {
    const result = await fetchJson({ url: "http://example.com/data.json" });
    expect(result.isError).toBe(true);
  });
});
