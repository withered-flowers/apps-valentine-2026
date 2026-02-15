#!/usr/bin/env node
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  connectFirestoreEmulator,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "dev",
  authDomain: "local",
  projectId: process.env.FIREBASE_PROJECT_ID || "demo-project",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Prefer emulator for local inspection
try {
  connectFirestoreEmulator(db, "localhost", 8080);
} catch (_e) {}

async function listUsers() {
  console.log("Listing users from Firestore (emulator if available)...");
  const snapshot = await getDocs(collection(db, "users"));
  if (snapshot.empty) {
    console.log("No users found.");
    return;
  }
  for (const doc of snapshot.docs) {
    console.log(doc.id, JSON.stringify(doc.data(), null, 2));
  }
}

listUsers().catch((err) => {
  console.error("Error listing users:", err);
  process.exit(1);
});
