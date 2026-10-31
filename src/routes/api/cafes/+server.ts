import { error, json } from "@sveltejs/kit";
import { getDb } from '$lib/server/mongo';
import { ObjectId } from "mongodb";
import type { RequestHandler } from "./$types";
import { env } from '$env/dynamic/private'

const AUTHORIZED_USERS = env.AUTHORIZED_USERS.split(',');

export const PUT = (async ({ request, locals }) => {
  const session = await locals.getSession();
  if (AUTHORIZED_USERS.indexOf(session?.user?.email as string) == -1) {
    error(401, 'Unauthorized');
  }

  const data = (await request.json()).data;
  if (!data || !Array.isArray(data.sections)) {
    error(400, 'Invalid cafes document');
  }
  let result;

  data._id = new ObjectId(data._id);

  try {
    const collection = getDb().collection('cafes');
    const dbResponse = await collection.replaceOne(
      { "_id": data._id },
      data
    )
    console.debug(JSON.stringify(dbResponse));
    result = { success: 'ok' }
  } catch (e) {
    console.error(e)
    result = { error: e }
  }
  return json(result);
}) satisfies RequestHandler;
