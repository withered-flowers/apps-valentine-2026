import { beforeAll, describe, expect, it, mock } from "bun:test";

// Mock Svelte 5 runes globally
beforeAll(() => {
	(globalThis as any).$state = (v: any) => v;
});

// Mock the auth service
mock.module("./auth", () => ({
	getUser: async (u: string) =>
		u === "existing" ? { username: u, senderName: "Existing" } : null,
	createUser: async () => {},
	updateLastLogin: async () => {},
}));

import { AuthState } from "./auth.svelte";

describe("AuthState Logic", () => {
	it("should initialize with no user", () => {
		const auth = new AuthState();
		expect(auth.user).toBeNull();
	});

	it("should login existing user", async () => {
		const auth = new AuthState();
		await auth.login("existing");
		expect(auth.user).not.toBeNull();
		expect(auth.isSignupRequired).toBe(false);
	});

	it("should require signup for new user", async () => {
		const auth = new AuthState();
		await auth.login("newuser");
		expect(auth.user).toBeNull();
		expect(auth.isSignupRequired).toBe(true);
		expect(auth.pendingUsername).toBe("newuser");
	});

	it("should complete signup for new user", async () => {
		const auth = new AuthState();
		await auth.login("newuser");

		// Mock getUser to return the user AFTER signup
		mock.module("./auth", () => ({
			getUser: async (u: string) => ({ username: u, senderName: "New" }),
			createUser: async () => {},
			updateLastLogin: async () => {},
		}));

		await auth.signup("New User");
		expect(auth.user).not.toBeNull();
		expect(auth.isSignupRequired).toBe(false);
	});

	it("should logout", async () => {
		const auth = new AuthState();
		// Use existing user from first mock state
		mock.module("./auth", () => ({
			getUser: async (u: string) => ({ username: u, senderName: "Existing" }),
			createUser: async () => {},
			updateLastLogin: async () => {},
		}));
		await auth.login("existing");
		expect(auth.user).not.toBeNull();
		auth.logout();
		expect(auth.user).toBeNull();
	});
});
