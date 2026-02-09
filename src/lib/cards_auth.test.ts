import { beforeAll, describe, expect, it } from "bun:test";
import { connectFirestoreEmulator } from "firebase/firestore";
import { createCard, getCard } from "./cards";
import { db } from "./firebase";

describe("Cards Service with Auth", () => {
	beforeAll(() => {
		try {
			connectFirestoreEmulator(db, "localhost", 8080);
		} catch (e) {
			// Ignore
		}
	});

	it("should create a card with senderUsername", async () => {
		const cardData = {
			sender: "Romeo",
			senderUsername: "romeo",
			receiver: "Juliet",
			message: "Love is heavy and light",
			theme: "romantic" as const,
		};

		const id = await createCard(cardData);
		const card = await getCard(id);

		expect(card).not.toBeNull();
		expect(card?.senderUsername).toBe("romeo");
	});
});
