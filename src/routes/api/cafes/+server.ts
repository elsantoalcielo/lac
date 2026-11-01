import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { requireUserApi } from '$lib/server/auth';
import { saveDocument, VersionConflictError } from '$lib/server/documents';

const MAX_TEXT_LENGTH = 1000;

const isText = (value: unknown): value is string => typeof value === 'string' && value.length <= MAX_TEXT_LENGTH;

const isValidItem = (item: any): boolean =>
  isText(item?.name) && item.name.length > 0 && isText(item?.price) && (item.description === undefined || isText(item.description));

const isValidSection = (section: any): boolean =>
  isText(section?.key) && isText(section?.title) && (section.note === undefined || isText(section.note)) && Array.isArray(section.items) && section.items.every(isValidItem);

export const PUT = (async ({ request, locals }) => {
  const email = await requireUserApi(locals);

  const data = (await request.json()).data;
  if (!data || typeof data._id !== 'string' || !Array.isArray(data.sections) || !data.sections.every(isValidSection)) {
    error(400, 'Invalid cafes document');
  }

  try {
    const version = await saveDocument('cafes', data, email);
    return json({ success: 'ok', version });
  } catch (e) {
    if (e instanceof VersionConflictError) {
      return json({ error: 'conflict' }, { status: 409 });
    }
    console.error(e);
    return json({ error: 'save failed' }, { status: 500 });
  }
}) satisfies RequestHandler;
