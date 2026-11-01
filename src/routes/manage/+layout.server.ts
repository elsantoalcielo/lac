import type { LayoutServerLoad } from './$types';
import { requireUserPage } from '$lib/server/auth';

// Every management page needs a signed-in, authorised user. The pages check again themselves,
// because SvelteKit runs layout and page loads in parallel.
export const load = (async ({ locals }) => {
  await requireUserPage(locals);
}) satisfies LayoutServerLoad;
