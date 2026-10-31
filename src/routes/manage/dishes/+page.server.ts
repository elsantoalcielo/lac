import { redirect } from '@sveltejs/kit';
import { getDb } from '$lib/server/mongo';
import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private'


const AUTHORIZED_USERS = env.AUTHORIZED_USERS.split(',');

export const load: PageServerLoad = async (event) => {

  const session = await event.locals.getSession();
  if (AUTHORIZED_USERS.indexOf(session?.user?.email as string) == -1) {
    redirect(303, '/auth/signin?csrf=true');
  }

  let dishes;

  const database = getDb();
  const collection = database.collection('dishes');
  dishes = await collection.find().sort({ name: 'asc' }).toArray();

  return { dishes: JSON.parse(JSON.stringify(dishes)) }
}