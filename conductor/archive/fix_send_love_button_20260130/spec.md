# Specification: Fix "Send Love" Button for Authenticated Users

## Overview
Authenticated users are currently unable to submit the card creation form. While the "Send Love" button in `CreateCardForm.svelte` appears active and clickable, clicking it results in no action, visual feedback, or error messages.

## Problem Statement
The card creation flow in `CreateCardForm.svelte` likely has a logic gap or event handler issue specifically when a user is in an authenticated state, preventing the `submit` or `click` event from being processed correctly.

## Functional Requirements
- The "Send Love" button must successfully trigger the card creation logic when the user is logged in.
- The form should provide visual feedback (e.g., a loading state) immediately upon clicking the button.
- After successful submission, the user should see a confirmation or be redirected as per the intended flow (likely to the sharing link or dashboard).

## Non-Functional Requirements
- Submission logic should remain responsive and work under 500ms (excluding network latency).
- Maintain existing glassmorphic styling and animations.

## Acceptance Criteria
- [ ] Clicking "Send Love" while logged in creates a new card document in Firestore.
- [ ] Form validation still prevents submission if required fields are missing.
- [ ] User receives clear feedback (success message or redirect) after clicking.
- [ ] Unit tests in `create-card.test.ts` or `CreateCardForm.svelte.test.ts` verify successful submission for authenticated users.

## Out of Scope
- Redesigning the card creation form.
- Modifying the authentication logic itself (unless directly causing the button failure).
