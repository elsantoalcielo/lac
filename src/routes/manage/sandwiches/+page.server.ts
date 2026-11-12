import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getDb } from '$lib/server/mongo';
import { requireUserPage } from '$lib/server/auth';
import { SANDWICH_COLLECTION } from '$lib/server/documents';

import type { SandwichMenu } from '$lib/types';

export const load = (async ({ locals }) => {
  await requireUserPage(locals);

  const sandwichMenu = await getDb().collection(SANDWICH_COLLECTION).findOne();
  if (!sandwichMenu) {
    error(500, `The ${SANDWICH_COLLECTION} document is missing from the database`);
  }

  return { sandwichMenu: JSON.parse(JSON.stringify(sandwichMenu)) as NonNullable<SandwichMenu> };
}) satisfies PageServerLoad;
