import { db } from './firebase';
import { 
  collection, 
  query, 
  where, 
  onSnapshot,
  orderBy
} from 'firebase/firestore';
import type { Card } from './cards';

/**
 * Subscribes to cards sent by a specific user.
 * In a real app, this might use auth.uid, but for this MVP we can use a list of IDs stored in localStorage
 * or just query by sender name if it's unique enough for the demo.
 * Let's assume we pass an array of card IDs.
 */
export function subscribeToCards(ids: string[], callback: (cards: Card[]) => void) {
  if (ids.length === 0) {
    callback([]);
    return () => {};
  }

  // Firestore "in" queries are limited to 10-30 items, but for MVP it's fine.
  const q = query(collection(db, 'cards'), where('__name__', 'in', ids));
  
  return onSnapshot(q, (snapshot) => {
    const cards = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Card);
    callback(cards);
  });
}
