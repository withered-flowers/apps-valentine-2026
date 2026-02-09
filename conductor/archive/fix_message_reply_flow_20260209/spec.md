# Track: Fix Message-Only Card Reply Flow

## Overview
Currently, for cards configured with "Text Reply" but without "Yes/No" buttons (`hideButtons: true`, `allowReply: true`), the receiver's reply is not correctly tracked as a completion state. This track aims to:
1. Ensure that submitting a reply on a buttonless card updates the card status to `replied`.
2. Disable further interaction for the receiver after the reply is sent.
3. Update the sender's dashboard to reflect this new `replied` status with a visual badge.

## Functional Requirements
### 1. New Card Status: `replied`
- Extend the `Card` status type to include `replied`.
- Status transition: `viewed` -> `replied` (when a reply is submitted on a card where `hideButtons` is `true`).

### 2. Receiver View Enhancements
- When a reply is submitted on a card where `hideButtons` is `true`:
    - The card status in Firestore must be updated to `replied`.
    - The receiver should be informed that the message was sent.
    - The input area should be disabled or replaced by a success message to prevent multiple submissions.

### 3. Sender Dashboard (StatusTracker)
- Update `StatusTracker.svelte` to handle the `replied` status.
- Add a "Replied" status color/style.
- Display the status text as "Replied" when `card.status === 'replied'`.

## Non-Functional Requirements
- **Reactivity:** Use Svelte 5 runes to ensure the status change is reflected immediately on the sender's dashboard.
- **TDD:** Write tests to verify the status transition and UI updates.

## Acceptance Criteria
- [ ] Submitting a reply on a card with `hideButtons: true` updates the Firestore document status to `replied`.
- [ ] After submitting a reply on such a card, the receiver sees the success message "💖 Message sent to [Sender]!" and cannot send another reply.
- [ ] The sender's dashboard shows the card status as "Replied" with appropriate styling.
- [ ] Existing button-based cards (`hideButtons: false`) still function as before (status remains `viewed` after reply until a button is clicked).

## Out of Scope
- Allowing receivers to edit replies after submission.
- Changing the flow for cards that have buttons enabled.
