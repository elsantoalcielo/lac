import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getDb } from '$lib/server/mongo';

import type { CafesMenu } from '$lib/types';
import { translateCafesMenu } from '$lib/utils';

export const load = (async ({ url, cookies }) => {

  const languageParam = url.searchParams.get('l');
  const languageCookie = cookies.get('l');
  const language = languageParam || languageCookie || 'ca';

  cookies.set('l', language, { path: '/' });

  const database = getDb();
  const collection = database.collection('cafes');
  const cafesMenu = await collection.findOne() as CafesMenu;

  if (!cafesMenu) {
    error(500, 'The cafes document is missing from the database');
  }

  translateCafesMenu(cafesMenu, language);

  return {
    cafesMenu: JSON.parse(JSON.stringify(cafesMenu)) as CafesMenu,
    language: language,
  }
}) satisfies PageServerLoad;
