import type { PageServerLoad } from './$types';
import { getDb } from '$lib/server/mongo';


export const load = (async ({ params }) => {

  let menu = null;

  const database = getDb();
  const collection = database.collection('current-menu');
  menu = await collection.findOne();

  return JSON.parse(JSON.stringify(menu))
}) satisfies PageServerLoad;