import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private'

export const load = (async ({ params }) => {
  return JSON.parse(JSON.stringify(env))
}) satisfies PageServerLoad;