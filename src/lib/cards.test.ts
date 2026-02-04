import { describe, it, expect, beforeAll } from 'bun:test';
import { createCard, getCard, updateCardStatus, subscribeToCard } from './cards';
import { db } from './firebase';
import { connectFirestoreEmulator } from 'firebase/firestore';

describe('Cards Service', () => {
  beforeAll(() => {
    try {
        connectFirestoreEmulator(db, 'localhost', 8080);
    } catch (e) {
        // Ignore
    }
  });

  it('should export necessary functions', () => {
    expect(createCard).toBeDefined();
    expect(getCard).toBeDefined();
    expect(updateCardStatus).toBeDefined();
    expect(subscribeToCard).toBeDefined();
  });

  it('subscribeToCard should return an unsubscribe function', () => {
    const unsubscribe = subscribeToCard('fake-id', () => {});
    expect(typeof unsubscribe).toBe('function');
    unsubscribe();
  });

  it('should fail to create a second card for the same user', async () => {
    const username = `user_${Date.now()}`;
    const cardData = {
      sender: 'Test Sender',
      senderUsername: username,
      receiver: 'Test Receiver',
      message: 'Hello!',
      theme: 'romantic' as const
    };

    // First card should succeed
    const firstId = await createCard(cardData);
    expect(firstId).toBeDefined();

    // Second card should throw an error
    try {
      await createCard(cardData);
      expect(true).toBe(false); // Should not reach here
    } catch (error: any) {
      expect(error.message).toBe('A card already exists for this user.');
    }
  });
});
