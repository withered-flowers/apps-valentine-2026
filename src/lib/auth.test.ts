import { beforeAll, describe, expect, it } from "bun:test";
import { connectFirestoreEmulator } from "firebase/firestore";
import { createUser, getUser } from "./auth";
import { db } from "./firebase";

describe("Auth Service", () => {
	beforeAll(() => {
		try {
			connectFirestoreEmulator(db, "localhost", 8080);
		} catch (e) {
			// Ignore if already connected
		}
	});

	it("should be able to create and retrieve a user", async () => {
		const username = "romeo";
		const senderName = "Romeo Montague";

		// Create user
		await createUser(username, senderName);

		// Retrieve user
		const user = await getUser(username);

		expect(user).not.toBeNull();
		expect(user?.username).toBe(username);
		expect(user?.senderName).toBe(senderName);
		expect(user?.createdAt).toBeDefined();
		expect(user?.lastLoginAt).toBeDefined();
	});

	it("should return null for non-existent user", async () => {
		const user = await getUser("nonexistent");
		expect(user).toBeNull();
	});
});
