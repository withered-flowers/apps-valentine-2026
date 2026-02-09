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

  it('should create a card with new optional fields', async () => {
    const username = `user_new_fields_${Date.now()}`;
    const cardData = {
      sender: 'Romeo',
      senderUsername: username,
      receiver: 'Juliet',
      message: 'Love is all',
      theme: 'romantic' as const,
      useCustomButtons: true,
      button1Text: 'Of course!',
      button2Text: 'Maybe later',
      allowReply: true
    };

    const id = await createCard(cardData);
    const card = await getCard(id);

    expect(card).not.toBeNull();
    expect(card?.useCustomButtons).toBe(true);
        expect(card?.button1Text).toBe('Of course!');
        expect(card?.button2Text).toBe('Maybe later');
        expect(card?.allowReply).toBe(true);
      });
    
      it('should create a card with hideButtons enabled', async () => {
        const username = `user_hide_buttons_${Date.now()}`;
        const cardData = {
          sender: 'Romeo',
          senderUsername: username,
          receiver: 'Juliet',
          message: 'Will you be my Valentine?',
          theme: 'romantic' as const,
          hideButtons: true,
          allowReply: true
        };
    
        const id = await createCard(cardData);
        const card = await getCard(id);
    
        expect(card).not.toBeNull();
            expect(card?.hideButtons).toBe(true);
            expect(card?.allowReply).toBe(true);
          });
        
          it('should handle explicit undefined values if passed (reproducing form state behavior)', async () => {
            const username = `user_undefined_fields_${Date.now()}`;
            const cardData = {
              sender: 'Romeo',
              senderUsername: username,
              receiver: 'Juliet',
              message: 'Will you be my Valentine?',
              theme: 'romantic' as const,
              useCustomButtons: false,
              button1Text: undefined,
              button2Text: undefined,
              hideButtons: true,
              allowReply: true
            };
        
            // If this fails, we found the bug!
            const id = await createCard(cardData);
            expect(id).toBeDefined();
          });
        });
        