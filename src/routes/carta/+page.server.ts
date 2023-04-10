import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private'

import { MongoClient } from 'mongodb';
import { translateAndCapitalize } from '$lib/utils';
import type { Menu } from '$lib/types';

export const load = (async ({ url }) => {

  const language = url.searchParams.get('l');

  const client = new MongoClient(env.MONGODB_URI);

  let menu = null;

  try {
    const database = client.db('amagat');
    const collection = database.collection('current-menu');
    menu = await collection.findOne() as Menu;

    translateAndCapitalize(menu, language);
  } finally {
    await client.close();
  }

  let footer;
  switch (language) {
    case "es": footer = "Todos los precios incluyen el IVA. Si tenéis alguna alergia o intolerancia, consultadnos, por favor";
      break;
    case "en": footer = "All prices include VAT. If you have any allergies or intolerances, please consult us";
      break;
    case "fi": footer = "Kaikki hinnat sisältävät ALV:n. Jos sinulla on allergia tai intoleranssi, ole hyvä ja kysy meiltä";
      break;
    default: footer = "Tots els preus inclouen l'IVA. Si teniu alguna AL·LÈRGIA o INTOLERÀNCIA, consulteu-nos, si us plau";
      break;
  }

  return {
    menu: JSON.parse(JSON.stringify(menu)),
    footer: footer,
    language: language,
  } as any
}) satisfies PageServerLoad;