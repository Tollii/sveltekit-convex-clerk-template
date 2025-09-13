import type { PageServerLoad } from "../$types";

export const load = (async ({ locals: { security } }) => {
    security.requireAuthenticatedRole("admin");
    return {
    };
}) satisfies PageServerLoad;