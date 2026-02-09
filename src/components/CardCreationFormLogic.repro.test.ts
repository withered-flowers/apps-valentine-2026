
import { describe, it, expect, beforeAll } from "bun:test";

beforeAll(() => {
  (globalThis as any).$state = (v: any) => v;
  (globalThis as any).$derived = (v: any) => v;
  (globalThis as any).$props = () => ({});
});

import { CreateCardFormState } from "../lib/create-card.svelte";

class ComponentSimulation {
    form: CreateCardFormState;

    constructor() {
        this.form = new CreateCardFormState();
    }

    // Simulate Svelte $effect
    runExclusionEffect() {
        if (this.form.useCustomButtons) {
            this.form.hideButtons = false;
        }
    }
}

describe("CreateCardForm Exclusion Logic", () => {
    it("should uncheck hideButtons when useCustomButtons is true", () => {
        const component = new ComponentSimulation();
        const form = component.form;
        
        // Initial state
        expect(form.useCustomButtons).toBe(false);
        expect(form.hideButtons).toBe(false);

        // User checks hideButtons first
        form.hideButtons = true;
        expect(form.hideButtons).toBe(true);

        // User then checks useCustomButtons
        form.useCustomButtons = true;
        component.runExclusionEffect(); // Simulate effect run
        
        // EXPECTATION: hideButtons should be forced to false
        expect(form.hideButtons).toBe(false);
    });
});
