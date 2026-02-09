import { describe, it, expect, afterEach, beforeAll } from "bun:test";
import { render, screen, cleanup } from "@testing-library/svelte";
import CardDisplay from "./CardDisplay.svelte";
import { GlobalRegistrator } from '@happy-dom/global-registrator';

describe("CardDisplay Animations", () => {
    beforeAll(() => {
        GlobalRegistrator.register();
    });

    afterEach(() => {
        cleanup();
        // GlobalRegistrator.unregister(); // Keep it registered for now
    });

    it("renders correctly with default props", () => {
        const card = {
            id: "1",
            sender: "Romeo",
            senderUsername: "romeo",
            receiver: "Juliet",
            message: "Test Message",
            theme: "romantic",
            status: "new"
        };
        
                // @ts-ignore
        
                render(CardDisplay, { card });
        
                expect(screen.getByText("Test Message")).toBeTruthy();
        
            });
        
        });
        
        