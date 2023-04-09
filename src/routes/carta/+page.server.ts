import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private'

import { MongoClient } from 'mongodb';
import { translate } from '$lib/utils';

export const load = (async ({ url }) => {

  const client = new MongoClient(env.MONGODB_URI);

  let menu = null;

  try {
    const database = client.db('amagat');
    const movies = database.collection('current-menu');
    menu = await movies.findOne() as Menu;

    translate(menu, url.searchParams.get('l'));
  } finally {
    await client.close();
  }

  return JSON.parse(JSON.stringify(menu))
}) satisfies PageServerLoad;