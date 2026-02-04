import { describe, it, expect, beforeAll } from "bun:test";

beforeAll(() => {
  (globalThis as any).$state = (v: any) => v;
  (globalThis as any).$derived = (v: any) => v;
  (globalThis as any).$props = () => ({});
});

import { CreateCardFormState } from "../lib/create-card.svelte";

// Simulating the Component Logic in @src/components/CreateCardForm.svelte
class ComponentSimulation {
    props: { authState: { user: { senderName: string, username: string } | null } };
    form: CreateCardFormState;

    constructor(initialProps: any) {
        this.props = initialProps;
        
        // Refactored Implementation: 
        // 1. Initialize empty
        this.form = new CreateCardFormState();
        
        // 2. Run effect immediately (Svelte behavior on mount)
        this.runEffect();
    }

    updateProps(newProps: any) {
        this.props = newProps;
        // Svelte runs effects after prop updates
        this.runEffect();
    }

    runEffect() {
        if (this.props.authState.user) {
            this.form.sender = this.props.authState.user.senderName;
            this.form.senderUsername = this.props.authState.user.username;
        }
    }
}

describe("CreateCardForm Reactivity Bug", () => {
    it("updates form sender when authState changes", () => {
        // Initial state: Unauthenticated (user is null)
        const authState = { user: null };
        const component = new ComponentSimulation({ authState });

        // Verify initial state
        // user?.senderName is undefined, defaulting to '' in constructor
        expect(component.form.sender).toBe(''); 

        // Simulate login (prop update)
        const newAuthState = { user: { senderName: "Romeo", username: "romeo123" } };
        component.updateProps({ authState: newAuthState });

        // EXPECTATION: The form instance should reflect the new values
        expect(component.form.sender).toBe("Romeo");
    });
});
