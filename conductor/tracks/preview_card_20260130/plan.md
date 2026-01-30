# Implementation Plan: Real-time Card Preview

## Phase 1: Shared Component Refactoring [checkpoint: pending]
To ensure 100% visual parity between the preview and the final card, we'll extract the core card UI into a reusable component.

- [x] Task: Create a `CardDisplay` component for shared usage. [7ed9c2a]
    - [x] Create `src/components/CardDisplay.svelte` to hold the card's visual structure.
    - [x] Implement props to accept card data (sender, receiver, message, theme, status).
    - [x] Add a `previewMode` prop to disable button interactions.
- [x] Task: Update `ReceiverView.svelte` to use `CardDisplay`. [7ed9c2a]
    - [x] Replace the inline card HTML with the new component.
    - [x] Verify existing functionality (Yes/No buttons, status updates) still works via tests.
- [x] Task: Conductor - User Manual Verification 'Phase 1: Shared Component Refactoring' (Protocol in workflow.md) [7ed9c2a]

## Phase 2: Preview Implementation & Desktop Layout [checkpoint: pending]
Implement the real-time synchronization and the split-screen view for desktop.

- [ ] Task: Update `CreateCardForm.svelte` with a split-screen layout.
    - [ ] Wrap the form and the new `CardDisplay` in a flex container (hidden preview on mobile for now).
    - [ ] Pass the live form state (`form.sender`, `form.receiver`, etc.) into `CardDisplay`.
- [ ] Task: Verify real-time updates.
    - [ ] Write tests to ensure form changes are reflected in the state correctly.
    - [ ] Manually verify that typing in the form updates the preview instantly on desktop.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Preview Implementation & Desktop Layout' (Protocol in workflow.md)

## Phase 3: Mobile Responsive Tabs [checkpoint: pending]
Add the tabbed interface for mobile and ensure the "Send Love" button is always accessible.

- [ ] Task: Implement Mobile Tab UI in `CreateCardForm.svelte`.
    - [ ] Create a "Edit / Preview" toggle visible only on small screens.
    - [ ] Use Svelte state to manage the active tab.
- [ ] Task: Implement Sticky "Send Love" Button.
    - [ ] Move the "Send Love" button out of the scrollable form container.
    - [ ] Position it as a fixed/sticky element at the bottom of the screen on mobile.
- [ ] Task: Final UX Polish.
    - [ ] Ensure smooth transitions between tabs.
    - [ ] Verify touch targets and layout on mobile emulation.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Mobile Responsive Tabs' (Protocol in workflow.md)
