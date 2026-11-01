import { error, json } from "@sveltejs/kit";
import { getDb } from '$lib/server/mongo';
import { ObjectId } from "mongodb";
import type { RequestHandler } from "./$types";
import { requireUserApi } from '$lib/server/auth';
import { isValidDish } from '$lib/server/validation';

export const PUT = (async ({ request, locals }) => {
  await requireUserApi(locals);

  const data = (await request.json()).data;
  if (!isValidDish(data)) {
    error(400, 'Invalid dish');
  }
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

export const DELETE = (async ({ request, locals }) => {
  await requireUserApi(locals);

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