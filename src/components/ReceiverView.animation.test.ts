import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

describe("ReceiverView Unboxing", () => {
    const cwd = process.cwd();
    const componentPath = join(cwd, "src/components/ReceiverView.svelte");
    const content = readFileSync(componentPath, "utf-8");

    it("should manage isOpen state", () => {
        expect(content).toContain("let isOpen = $state");
    });

    it("should conditionally render Envelope or CardDisplay", () => {
        // We look for logic that hides/shows based on isOpen
        expect(content).toContain("Envelope");
        expect(content).toContain("CardDisplay");
    });
});
