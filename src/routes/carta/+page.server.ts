import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private'

import { MongoClient } from 'mongodb';
import { translateAndCapitalizeMenu } from '$lib/utils';
import type { Menu } from '$lib/types';

export const load = (async ({ url, cookies }) => {

  const languageParam = url.searchParams.get('l');
  const languageCookie = cookies.get('l');
  const language = languageParam || languageCookie || 'ca';

  cookies.set('l', language, { path: '/' });

  const client = new MongoClient(env.MONGODB_URI);

  let menu = null;

  try {
    const database = client.db('amagat');
    const collection = database.collection('current-menu');
    menu = await collection.findOne() as Menu;

    translateAndCapitalizeMenu(menu, language);
  } finally {
    await client.close();
  }

  let title;
  let footer;
  switch (language) {
    case "es":
      title = "Nuestra propuesta gastronómica";
      footer = "Todos los precios incluyen el IVA. Si tenéis alguna ALERGIA o INTOLERANCIA, consultadnos, por favor";
      break;
    case "en":
      title = "Our gastronomic proposal";
      footer = "All prices include VAT. If you have any ALLERGIES or INTOLERANCES, please consult us";
      break;
    case "fi":
      title = "Gastronominen ehdotuksemme";
      footer = "Kaikki hinnat sisältävät ALV:n. Jos sinulla on ALLERGIA tai INTOLERANSSI, ole hyvä ja kysy meiltä";
      break;
    case "ko":
      title = "우리의 요리 제안";
      footer = "모든 가격은 부가가치세가 포함됩니다. 알레르기나 불내증이 있으신 경우, 상담해 주세요";
      break;
    default:
      title = "La nostra proposta gastronòmica";
      footer = "Tots els preus inclouen l'IVA. Si teniu alguna AL·LÈRGIA o INTOLERÀNCIA, consulteu-nos, si us plau";
      break;
  }

  return {
    menu: JSON.parse(JSON.stringify(menu)),
    title: title,
    footer: footer,
    language: language,
  } as any
}) satisfies PageServerLoad;