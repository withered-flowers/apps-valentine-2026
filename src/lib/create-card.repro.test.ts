import { describe, it, expect, mock, beforeAll } from 'bun:test';

// Mock Svelte 5 runes globally
beforeAll(() => {
  (globalThis as any).$state = (v: any) => v;
  (globalThis as any).$derived = (v: any) => v;
});

import { CreateCardFormState } from './create-card.svelte';

const mockCreateCard = mock(async () => 'test-id');
mock.module('./cards', () => ({
  createCard: mockCreateCard
}));

describe('CreateCardForm Validation Rules', () => {
  const getBaseForm = () => {
    const form = new CreateCardFormState('Romeo', 'romeo123');
    form.receiver = 'Juliet';
    form.message = 'Love';
    return form;
  };

  it('1. should be VALID: Hide Choice Button Checked, Allow Text Reply Checked', () => {
    const form = getBaseForm();
    form.hideButtons = true;
    form.allowReply = true;
    expect(form.isValid).toBe(true);
  });

  it('should be INVALID: Hide Choice Button Checked, Allow Text Reply Unchecked', () => {
    const form = getBaseForm();
    form.hideButtons = true;
    form.allowReply = false;
    expect(form.isValid).toBe(false);
  });

  it('2. should be VALID: Hide Choice Button Unchecked, Allow Text Reply Checked', () => {
    const form = getBaseForm();
    form.hideButtons = false;
    form.allowReply = true;
    expect(form.isValid).toBe(true);
  });

  it('3. should be VALID: Custom Choice Button Checked, Allow Text Reply Unchecked', () => {
    const form = getBaseForm();
    form.useCustomButtons = true;
    form.button1Text = 'Yes';
    form.button2Text = 'No';
    form.allowReply = false;
    expect(form.isValid).toBe(true);
  });

  it('4. should be VALID: Custom Choice Button Unchecked, Allow Text Reply Unchecked', () => {
    const form = getBaseForm();
    form.useCustomButtons = false;
    form.allowReply = false;
    expect(form.isValid).toBe(true);
  });

  it('5. should be VALID: All options Unchecked', () => {
    const form = getBaseForm();
    form.hideButtons = false;
    form.useCustomButtons = false;
    form.allowReply = false;
    expect(form.isValid).toBe(true);
  });
});
