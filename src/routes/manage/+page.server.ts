import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private'

import { MongoClient } from 'mongodb';
import type { Menu } from '$lib/types';

const AUTHORIZED_USERS = env.AUTHORIZED_USERS.split(',');

export const load: PageServerLoad = async (event) => {

  const session = await event.locals.getSession();
  if (AUTHORIZED_USERS.indexOf(session?.user?.email as string) == -1) {
    throw redirect(303, '/auth/signin?csrf=true');
  }

  let menu;
  let dishes;

  const client = new MongoClient(env.MONGODB_URI);
  try {
    const database = client.db('amagat');
    const currentMenuCollection = database.collection(process.env.NODE_ENV == 'development' ? 'draft-menu' : 'current-menu');
    menu = await currentMenuCollection.findOne();

    const dishesCollection = database.collection('dishes');
    dishes = await dishesCollection.find().toArray();
  } finally {
    await client.close();
  }

  return JSON.parse(JSON.stringify({menu, dishes}))
}