import {
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	onSnapshot,
	query,
	serverTimestamp,
	type Timestamp,
	updateDoc,
	where,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";

export interface Card {
	id?: string;
	sender: string;
	senderUsername: string;
	receiver: string;
	message: string;
	title?: string;
	theme: "romantic" | "playful" | "elegant";
	status: "sent" | "viewed" | "accepted" | "declined" | "replied";
	useCustomButtons?: boolean;
	button1Text?: string;
	button2Text?: string;
	hideButtons?: boolean;
	allowReply?: boolean;
	replyText?: string;
	createdAt: Timestamp;
	updatedAt: Timestamp;
}

export async function createCard(
	cardData: Omit<Card, "id" | "status" | "createdAt" | "updatedAt">,
) {
	const cardsCol = collection(db, "cards");

	// Check if a card already exists for this user
	const q = query(
		cardsCol,
		where("senderUsername", "==", cardData.senderUsername),
	);
	const querySnapshot = await getDocs(q);

	if (!querySnapshot.empty) {
		throw new Error("A card already exists for this user.");
	}

	// Filter out undefined values to prevent Firestore errors
	const cleanCardData = Object.fromEntries(
		Object.entries(cardData).filter(([_, v]) => v !== undefined),
	);

	const newCard = {
		...cleanCardData,
		status: "sent",
		createdAt: serverTimestamp(),
		updatedAt: serverTimestamp(),
	};
	const docRef = await addDoc(cardsCol, newCard);
	return docRef.id;
}

export async function getCard(id: string): Promise<Card | null> {
	if (!isFirebaseConfigured) {
		if (import.meta.env.DEV) {
			return null;
		}
		throw new Error("Missing Firebase configuration.");
	}

	try {
		const docRef = doc(db, "cards", id);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			return { id: docSnap.id, ...docSnap.data() } as Card;
		}
		return null;
	} catch (err) {
		console.warn("getCard failed:", err);
		return null;
	}
}

export async function updateCardStatus(id: string, status: Card["status"]) {
	const docRef = doc(db, "cards", id);
	await updateDoc(docRef, {
		status,
		updatedAt: serverTimestamp(),
	});
}

/**
 * Subscribes to a card's updates.
 * In Svelte 5, this should be used inside an $effect or a custom state class.
 */
export function subscribeToCard(
	id: string,
	callback: (card: Card | null) => void,
) {
	if (!isFirebaseConfigured) {
		if (import.meta.env.DEV) {
			// In dev without Firebase, immediately return null and a noop unsubscribe.
			callback(null);
			return () => {};
		}
		throw new Error("Missing Firebase configuration.");
	}

	const docRef = doc(db, "cards", id);
	return onSnapshot(docRef, (docSnap) => {
		if (docSnap.exists()) {
			callback({ id: docSnap.id, ...docSnap.data() } as Card);
		} else {
			callback(null);
		}
	});
}
