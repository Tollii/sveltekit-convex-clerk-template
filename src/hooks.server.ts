import { withClerkHandler } from 'svelte-clerk/server'
import { type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { ConvexClient } from 'convex/browser';
import { PUBLIC_CONVEX_URL } from '$env/static/public';
import { Security } from '$lib/security';

const setupConvexClient: Handle = async ({ event, resolve }) => {
    const auth = event.locals.auth();
    const token = await auth.getToken({ template: "convex" });

    const client = new ConvexClient(PUBLIC_CONVEX_URL)
    client.setAuth(async () => token ?? undefined);

    event.locals.convexClient = client;

    return resolve(event);
}

const setupSecurity: Handle = async ({ event, resolve }) => {
    event.locals.security = new Security(event);
    return resolve(event);
}

export const handle: Handle = sequence(
    withClerkHandler(),
    setupSecurity,
    setupConvexClient,
);