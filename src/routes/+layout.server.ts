import { buildClerkProps } from "svelte-clerk/server";
import type { LayoutServerLoad } from "./$types";

export const load = (async ({ locals }) => {
  const auth = locals.auth();
  const token = await auth.getToken({ template: "convex" });
  const roles = auth.sessionClaims?.roles;

  return {
    token,
    roles,
    ...buildClerkProps(auth)
  };
}) satisfies LayoutServerLoad;