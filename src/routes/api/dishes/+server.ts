import { json } from "@sveltejs/kit";
import { getDb } from '$lib/server/mongo';
import { ObjectId } from "mongodb";
import type { RequestHandler } from "./$types";

export const PUT = (async ({ request }) => {
  const data = (await request.json()).data;
  let result;

  data._id = new ObjectId(data._id);

  try {
    const database = getDb();
    const currentMenu = database.collection('dishes');
    const dbResponse = await currentMenu.replaceOne(
      { "_id": data._id },
      data,
      { upsert: true}
    )
    console.debug(JSON.stringify(dbResponse));
    result = { success: 'ok', id: dbResponse.upsertedId }
  } catch (e) {
    console.error(e)
    result = { error: e }
  }
  return json(result);
}) satisfies RequestHandler;

export const DELETE = (async ({ request }) => {
  const data = (await request.json()).data;
  let result;

  data._id = new ObjectId(data._id);

  try {
    const database = getDb();
    const currentMenu = database.collection('dishes');
    const dbResponse = await currentMenu.deleteOne(
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