import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private'

import { MongoClient } from 'mongodb';

const AUTHORIZED_USERS = env.AUTHORIZED_USERS.split(',');

export const load: PageServerLoad = async (event) => {

  const session = await event.locals.getSession();
  if (AUTHORIZED_USERS.indexOf(session?.user?.email as string) == -1) {
    throw redirect(303, '/auth/signin?csrf=true');
  }

  let menu = null;

  const client = new MongoClient(env.MONGODB_URI);
  try {
    const database = client.db('amagat');
    const movies = database.collection('current-menu');
    menu = await movies.findOne();
  } finally {
    await client.close();
  }

  return JSON.parse(JSON.stringify(menu))
}