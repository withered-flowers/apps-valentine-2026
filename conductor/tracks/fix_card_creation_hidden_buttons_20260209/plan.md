# Implementation Plan: Fix Card Creation Failure with Hidden Buttons

## Phase 1: Bug Reproduction & Error Handling [checkpoint: ]
- [x] Task: Confirm bug with unit tests
    - [x] Add failing test case to `src/lib/cards.test.ts` that passes explicit `undefined` values.
    - [x] Update `src/lib/create-card.repro.test.ts` to simulate the full `CreateCardFormState.submit()` flow and confirm it fails when service throws.
- [x] Task: Improve Error Reporting in `CreateCardFormState` 4baff4e
    - [x] Update `submit()` method in `src/lib/create-card.svelte.ts` to capture and display the specific error message if available, rather than a generic one.
    - [x] Verify that tests now show more descriptive errors.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Bug Reproduction & Error Handling' (Protocol in workflow.md)

## Phase 2: Fix Data Preparation [checkpoint: ]
- [ ] Task: Refactor `CreateCardFormState.submit()` to avoid `undefined` values
    - [ ] Modify the `createCard` call in `src/lib/create-card.svelte.ts` to only include `button1Text` and `button2Text` if `useCustomButtons` is `true`.
    - [ ] Alternatively, implement a utility to strip all `undefined` values from the data object before sending to Firestore.
    - [ ] Verify that the `cards.test.ts` failing case now passes (after updating it to use the new logic or fixing the service).
- [ ] Task: Update `createCard` service to be more robust
    - [ ] (Optional) Add a guard in `src/lib/cards.ts` to strip `undefined` fields from incoming `cardData` to prevent future regressions from other forms.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Fix Data Preparation' (Protocol in workflow.md)

## Phase 3: Final Verification & Cleanup [checkpoint: ]
- [ ] Task: Run full test suite
    - [ ] Execute `bun test` to ensure no regressions in card creation or dashboard functionality.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Final Verification & Cleanup' (Protocol in workflow.md)
