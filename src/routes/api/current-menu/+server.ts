import { json } from "@sveltejs/kit";
import { getDb } from '$lib/server/mongo';
import { ObjectId } from "mongodb";
import type { RequestHandler } from "./$types";
import { requireUserApi } from '$lib/server/auth';
import { env } from '$env/dynamic/private'

export const PUT = (async ({ request, locals }) => {
  await requireUserApi(locals);

  const data = (await request.json()).data;
  let result;

  data._id = new ObjectId(data._id);

  try {
    const database = getDb();
    const currentMenu = database.collection(process.env.NODE_ENV == 'development' ? 'draft-menu' : 'current-menu');
    const dbResponse = await currentMenu.replaceOne(
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