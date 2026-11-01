import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getDb } from '$lib/server/mongo';
import { requireUserPage } from '$lib/server/auth';

import type { CafesMenu } from '$lib/types';

export const load = (async ({ locals }) => {
  await requireUserPage(locals);

  const cafesMenu = await getDb().collection('cafes').findOne();
  if (!cafesMenu) {
    error(500, 'The cafes document is missing from the database');
  }

  return { cafesMenu: JSON.parse(JSON.stringify(cafesMenu)) as NonNullable<CafesMenu> };
}) satisfies PageServerLoad;
