import { json } from "@sveltejs/kit";
import { MongoClient, ObjectId } from "mongodb";
import type { RequestHandler } from "./$types";
import { env } from '$env/dynamic/private'

export const PUT = (async ({ request }) => {
  const data = (await request.json()).data;
  let result;

  data._id = new ObjectId(data._id);

  const client = new MongoClient(env.MONGODB_URI);
  try {
    const database = client.db('amagat');
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
  finally {
    await client.close();
  }
  return json(result);
}) satisfies RequestHandler;