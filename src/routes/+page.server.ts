import { api } from "$convex/api"
import type { PageServerLoad } from "./$types";

export const load = (async ({ locals: { convexClient } }) => {
  const tasks = await convexClient.query(api.tasks.get, {});

  return {
    tasks
  }
}) satisfies PageServerLoad;