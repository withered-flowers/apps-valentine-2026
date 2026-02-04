import { db } from '../lib/firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { connectFirestoreEmulator } from 'firebase/firestore';

// Connect to emulator
try {
    connectFirestoreEmulator(db, 'localhost', 8080);
} catch (e) {}

async function migrateUsers() {
  console.log('Migrating users...');
  const querySnapshot = await getDocs(collection(db, 'users'));
  let count = 0;
  for (const userDoc of querySnapshot.docs) {
    const data = userDoc.data();
    if (!data.username) {
      await updateDoc(doc(db, 'users', userDoc.id), {
        username: userDoc.id
      });
      count++;
    }
  }
  console.log(`Migrated ${count} users.`);
}

migrateUsers().then(() => process.exit(0));
