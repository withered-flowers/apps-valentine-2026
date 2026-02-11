import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

describe("CreateCardForm Animations", () => {
    const cwd = process.cwd();
    const componentPath = join(cwd, "src/components/CreateCardForm.svelte");
    const content = readFileSync(componentPath, "utf-8");

    it("should use svelte/transition", () => {
        expect(content).toContain('import { fly, fade } from "svelte/transition"');
    });

    it("should use in:fly and out:fly", () => {
        expect(content).toContain("in:fly");
        expect(content).toContain("out:fly");
    });

    it("should include a heart pulse overlay", () => {
        // We expect a specific visual element or class for the pulse effect
        expect(content).toContain("heart-pulse-overlay");
    });
});
