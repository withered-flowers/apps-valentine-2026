import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

describe("CreateCardForm Animations", () => {
    const cwd = process.cwd();
    const componentPath = join(cwd, "src/components/CreateCardForm.svelte");
    const content = readFileSync(componentPath, "utf-8");

    it("should use svelte/transition", () => {
        expect(content).toContain('import { fly, fade, scale } from "svelte/transition"');
    });

    it("should use in:scale and out:fade for the heart pulse", () => {
        expect(content).toContain("in:scale");
        expect(content).toContain("out:fade");
    });

    it("should include a visible SVG heart", () => {
        expect(content).toContain("<svg");
        // Check for path data often used in heart icons or just that it's an SVG
        expect(content).toContain("d=\"M11.645 20.91"); // Part of the path data
    });
});
