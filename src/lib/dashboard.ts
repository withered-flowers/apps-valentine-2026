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
 */
export function subscribeToCards(username: string, callback: (cards: Card[]) => void) {
  if (!username) {
    callback([]);
    return () => {};
  }

  const q = query(
    collection(db, 'cards'), 
    where('senderUsername', '==', username),
    orderBy('createdAt', 'desc')
  );
  
  return onSnapshot(q, (snapshot) => {
    const cards = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Card);
    callback(cards);
  });
}
