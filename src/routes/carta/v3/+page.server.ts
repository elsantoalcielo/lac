import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private'

import { MongoClient } from 'mongodb';

export const load = (async ({ params }) => {

  const client = new MongoClient(env.MONGODB_URI);

  let menu = null;

  try {
    const database = client.db('amagat');
    const collection = database.collection('current-menu');
    menu = await collection.findOne();
  } finally {
    await client.close();
  }

  return JSON.parse(JSON.stringify(menu))
}) satisfies PageServerLoad;