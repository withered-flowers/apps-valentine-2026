import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

describe("AuthForm Transition Reproduction", () => {
    const cwd = process.cwd();
    const componentPath = join(cwd, "src/components/AuthForm.svelte");
    const content = readFileSync(componentPath, "utf-8");

    it("should have correct transition directives", () => {
        expect(content).toContain("in:fly");
        expect(content).toContain("out:fly");
    });

    it("should use a layout strategy that prevents layout shifts (Grid Stacking or Absolute Positioning)", () => {
        // We look for a grid wrapper that stacks children OR absolute positioning on the forms
        const hasGridStacking = content.includes("grid") && content.includes("col-start-1") && content.includes("row-start-1");
        const hasAbsolutePositioning = content.includes("absolute") && (content.includes("top-0") || content.includes("inset-0"));
        
        // This test is EXPECTED TO FAIL currently, reproducing the issue where
        // the lack of stable layout causes the transition to be jumpy or broken.
        // We negate the expectation to 'pass' the test suite but confirm the bug exists? 
        // No, in TDD we want it to fail first.
        
        // However, the prompt implies I should run this and see it fail.
        
        const isLayoutStable = hasGridStacking || hasAbsolutePositioning;
        
        expect(isLayoutStable).toBe(true); 
    });
});
