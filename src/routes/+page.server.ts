import type { PageServerLoad } from './$types'


export const load = (async () => {
  return {
    token: '1234567890'
  };
}) satisfies PageServerLoad;