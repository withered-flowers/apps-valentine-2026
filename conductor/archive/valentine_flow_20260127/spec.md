# Track Specification: Core Valentine's Card Flow

## Overview
This track focuses on the end-to-end journey of creating and responding to a digital Valentine's card. It encompasses the sender's creation experience, the recipient's interactive experience, and the real-time feedback loop.

## User Stories
- **As a Sender**, I want to create a personalized card so I can express my feelings.
- **As a Sender**, I want to track if my card has been opened and what the response is in real-time.
- **As a Receiver**, I want to view a beautiful, romantic card and respond to the "Will you be my Valentine?" question.

## Functional Requirements
- **Card Creation Form:**
  - Fields: Sender Name, Receiver Name, Message, Card Type (Romantic, Playful, Elegant).
  - Real-time preview of the card content.
  - Form validation for all required fields.
  - Generation of a unique ID for each card.
- **Interactive Recipient View:**
  - Display the personalized message and chosen theme.
  - Floating hearts/petals background animation.
  - "Yes" button that triggers a celebratory animation and updates status to "Accepted".
  - Playful "No" button that moves away from the cursor/tap but eventually becomes clickable. Updates status to "Declined".
- **Real-time Status Tracking:**
  - Update status to "Viewed" when the recipient opens the link.
  - Update status to "Accepted" or "Declined" based on interaction.
  - A dashboard for the sender to see these updates in real-time.

## Technical Constraints
- Use Astro 5.0+ and Svelte 5 with Runes.
- Firebase Firestore for data storage and real-time updates.
- Tailwind CSS for styling with the custom "Valentine" theme.
- PWA support.

## Success Criteria
- Senders can successfully create and share cards.
- Recipients can interact with the cards and provide responses.
- Real-time updates are correctly reflected in the sender's dashboard.
- Code coverage for new components and logic is >80%.
