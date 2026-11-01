import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { requireUserApi } from '$lib/server/auth';
import { listHistory, VERSIONED_COLLECTIONS } from '$lib/server/documents';

export const GET = (async ({ url, locals }) => {
  await requireUserApi(locals);

  const collection = url.searchParams.get('collection') ?? '';
  if (!VERSIONED_COLLECTIONS.includes(collection)) {
    error(400, 'Unknown collection');
  }

  return json(await listHistory(collection));
}) satisfies RequestHandler;
