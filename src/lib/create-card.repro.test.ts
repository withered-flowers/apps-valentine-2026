import { describe, it, expect, mock, beforeAll } from 'bun:test';

// Mock Svelte 5 runes globally
beforeAll(() => {
  (globalThis as any).$state = (v: any) => v;
  (globalThis as any).$derived = (v: any) => v;
});

import { CreateCardFormState } from './create-card.svelte';

// We want to test the interaction with the cards service
// but we'll mock the actual firebase call to see what it receives.
const mockCreateCard = mock(async () => 'test-id');
mock.module('./cards', () => ({
  createCard: mockCreateCard
}));

describe('CreateCardForm Bug Reproduction', () => {
  it('should be valid when hideButtons is true', () => {
    const form = new CreateCardFormState('Romeo', 'romeo123');
    form.receiver = 'Juliet';
    form.message = 'Will you be my Valentine?';
    form.hideButtons = true;
    form.useCustomButtons = false; // Mutually exclusive in UI, but let's be explicit
    
    expect(form.isValid).toBe(true);
  });

  it('should call createCard with correct data when hideButtons is true', async () => {
    const form = new CreateCardFormState('Romeo', 'romeo123');
    form.receiver = 'Juliet';
    form.message = 'Will you be my Valentine?';
    form.hideButtons = true;
    form.allowReply = true;
    
    await form.submit();
    
    expect(form.error).toBeNull();
    expect(form.success).toBe('test-id');
    
    const lastCall = mockCreateCard.mock.calls[0][0];
    expect(lastCall.hideButtons).toBe(true);
    expect(lastCall.allowReply).toBe(true);
  });

  it('should handle failures from the service gracefully', async () => {
    mockCreateCard.mockImplementationOnce(async () => {
        throw new Error('Firestore Error');
    });

    const form = new CreateCardFormState('Romeo', 'romeo123');
    form.receiver = 'Juliet';
    form.message = 'Will you be my Valentine?';
    form.hideButtons = true;
    
    await form.submit();
    
    expect(form.error).toBe('Firestore Error');
  });
});