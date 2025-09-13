// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

/// <reference types="svelte-clerk/env" />

import type { Security } from "$lib/security";
import type { ConvexClient } from "convex/browser";

declare global {
	namespace App {
		interface Locals {
			convexClient: ConvexClient;
			security: Security;
		}
		interface PageData {
			token: string | null;
		}
		// interface Error {}
		// interface Locals {}
		// interface PageState {}
		// interface Platform {}
	}
}