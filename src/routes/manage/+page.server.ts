import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private'

import { MongoClient } from 'mongodb';
import { translateAndCapitalize } from '$lib/utils';

const AUTHORIZED_USERS = env.AUTHORIZED_USERS.split(',');

export const load: PageServerLoad = async (event) => {

  const session = await event.locals.getSession();
  if (AUTHORIZED_USERS.indexOf(session?.user?.email as string) == -1) {
    throw redirect(303, '/auth/signin?csrf=true');
  }

  let menu: Menu = null;

  const client = new MongoClient(env.MONGODB_URI);
  try {
    const database = client.db('amagat');
    const collection = database.collection('current-menu');
    menu = await collection.findOne() as Menu;
  } finally {
    await client.close();
  }

  return JSON.parse(JSON.stringify(menu))
}