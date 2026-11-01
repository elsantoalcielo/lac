import type { PageServerLoad } from './$types';
import { requireUserPage } from '$lib/server/auth';

export const load = (async ({ locals }) => {
  const email = await requireUserPage(locals);
  return { email };
}) satisfies PageServerLoad;
