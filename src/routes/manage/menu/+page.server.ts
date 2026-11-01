import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getDb } from '$lib/server/mongo';
import { requireUserPage } from '$lib/server/auth';
import { MENU_COLLECTION } from '$lib/server/documents';

export const load = (async ({ locals }) => {
  await requireUserPage(locals);

  const database = getDb();
  const menu = await database.collection(MENU_COLLECTION).findOne();
  if (!menu) {
    error(500, `The ${MENU_COLLECTION} document is missing from the database`);
  }
  const dishes = await database.collection('dishes').find().sort({ name: 1 }).toArray();

  return {
    menu: JSON.parse(JSON.stringify(menu)),
    dishes: JSON.parse(JSON.stringify(dishes)),
    collection: MENU_COLLECTION,
  };
}) satisfies PageServerLoad;
