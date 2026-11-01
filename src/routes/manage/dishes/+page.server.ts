import type { PageServerLoad } from './$types';
import { getDb } from '$lib/server/mongo';
import { requireUserPage } from '$lib/server/auth';

export const load = (async ({ locals }) => {
  await requireUserPage(locals);

  const dishes = await getDb().collection('dishes').find().sort({ name: 1 }).toArray();

  return { dishes: JSON.parse(JSON.stringify(dishes)) };
}) satisfies PageServerLoad;
