import { describe, it, expect, mock, beforeAll } from 'bun:test';

// Mock Svelte 5 runes globally
beforeAll(() => {
  (globalThis as any).$state = (v: any) => v;
  (globalThis as any).$derived = (v: any) => v;
});

import { CreateCardFormState } from './create-card.svelte';

// Mock the cards service
mock.module('./cards', () => ({
  createCard: async () => 'test-id-123'
}));

describe('CreateCardForm Repro', () => {
  it('should allow authenticated user to submit valid form', async () => {
    // authenticated user: senderName and senderUsername are present
    const form = new CreateCardFormState('Romeo', 'romeo_user');
    
    form.receiver = 'Juliet';
    form.message = 'My Valentine';
    form.theme = 'romantic';

    await form.submit();

    // The Bug: 
    // 1. isValid is undefined -> validation fails
    // 2. error is set but not reactive -> no UI feedback
    
    // We expect success to be populated if it was working
    expect(form.success).toBe('test-id-123');
    expect(form.error).toBeNull();
  });
});
