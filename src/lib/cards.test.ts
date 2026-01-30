import { describe, it, expect } from 'bun:test';
import { createCard, getCard, updateCardStatus, subscribeToCard } from './cards';

describe('Cards Service', () => {
  it('should export necessary functions', () => {
    expect(createCard).toBeDefined();
    expect(getCard).toBeDefined();
    expect(updateCardStatus).toBeDefined();
    expect(subscribeToCard).toBeDefined();
  });

  it('subscribeToCard should return an unsubscribe function', () => {
    // We can't easily test the callback without a real Firestore or complex mock
    // but we can check if it returns a function.
    const unsubscribe = subscribeToCard('fake-id', () => {});
    expect(typeof unsubscribe).toBe('function');
    unsubscribe();
  });
});
