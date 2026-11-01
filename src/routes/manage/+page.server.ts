import type { PageServerLoad } from './$types';
import { requireUserPage } from '$lib/server/auth';

export const load = (async ({ locals }) => {
  await requireUserPage(locals);
}) satisfies PageServerLoad;
