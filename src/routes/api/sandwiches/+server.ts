import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { requireUserApi } from '$lib/server/auth';
import { SANDWICH_COLLECTION, saveDocument, VersionConflictError } from '$lib/server/documents';
import { isValidSandwichSection } from '$lib/server/validation';

export const PUT = (async ({ request, locals }) => {
  const email = await requireUserApi(locals);

  const data = (await request.json()).data;
  if (!data || typeof data._id !== 'string' || !Array.isArray(data.sections) || !data.sections.every(isValidSandwichSection)) {
    error(400, 'Invalid sandwich menu document');
  }

  try {
    const version = await saveDocument(SANDWICH_COLLECTION, data, email);
    return json({ success: 'ok', version });
  } catch (e) {
    if (e instanceof VersionConflictError) {
      return json({ error: 'conflict' }, { status: 409 });
    }
    console.error(e);
    return json({ error: 'save failed' }, { status: 500 });
  }
}) satisfies RequestHandler;
