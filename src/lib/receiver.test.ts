import { describe, it, expect, mock, beforeAll } from 'bun:test';

// Mock Svelte 5 runes globally
beforeAll(() => {
  (globalThis as any).$state = (v: any) => v;
});

// Mock the cards service
const mockUpdateStatus = mock(async () => {});
mock.module('./cards', () => ({
  updateCardStatus: mockUpdateStatus
}));

// Mock firebase/firestore

const mockUpdateDoc = mock(async () => {});

const mockDoc = mock(() => ({}));

mock.module('firebase/firestore', () => ({

  updateDoc: mockUpdateDoc,

  doc: mockDoc,

  serverTimestamp: () => ({}),

  collection: () => ({}),

  getFirestore: () => ({}),

  onSnapshot: () => () => {},

  getDoc: async () => ({ exists: () => false }),

  addDoc: async () => ({ id: 'new-id' }),

  query: () => ({}),

  where: () => ({}),

  getDocs: async () => ({ empty: true, docs: [] })

}));



import { ReceiverViewLogic } from './receiver.svelte';

import type { Card } from './cards';

import { Timestamp } from 'firebase/firestore';



const fakeCard: Card = {

  sender: 'Romeo',

  senderUsername: 'romeo',

  receiver: 'Juliet',

  message: 'Love',

  theme: 'romantic',

  status: 'sent',

  createdAt: {} as Timestamp,

  updatedAt: {} as Timestamp

};



describe('ReceiverViewLogic', () => {

  it('should initialize with provided card', () => {

    const logic = new ReceiverViewLogic('id-1', fakeCard);

    expect(logic.card?.sender).toBe('Romeo');

  });



  it('should move No button and grow Yes button on hover', () => {

    const logic = new ReceiverViewLogic('id-1', fakeCard);

    const initialPos = { ...logic.noButtonPos };

    const initialScale = logic.yesButtonScale;

    

    logic.handleNoHover();

    

    expect(logic.noButtonPos).not.toEqual(initialPos);

    expect(logic.yesButtonScale).toBeGreaterThan(initialScale);

  });



  it('should mark as viewed if status is sent', async () => {

    const logic = new ReceiverViewLogic('id-1', fakeCard);

    await logic.markAsViewed();

    expect(mockUpdateStatus).toHaveBeenCalledWith('id-1', 'viewed');

  });



  it('should call onAccept callback when card is accepted', async () => {

    const onAccept = mock(() => {});

    const logic = new ReceiverViewLogic('id-1', fakeCard, onAccept);

    await logic.accept();

    expect(onAccept).toHaveBeenCalled();

  });



  it('should submit reply and update status', async () => {

    const logic = new ReceiverViewLogic('id-1', fakeCard);

    logic.replyText = 'I love you too!';

    await logic.submitReply();

    

    expect(mockUpdateDoc).toHaveBeenCalled();

    expect(logic.replySuccess).toBe(true);

    expect(logic.replyText).toBe('');

  });

});
