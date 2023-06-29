import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private'

import { MongoClient } from 'mongodb';
import type { SandwichMenu } from '$lib/types';
import { translateSandwichMenu } from '$lib/utils';

export const load = (async ({ url }) => {

  const language = url.searchParams.get('l') || 'ca';

  const client = new MongoClient(env.MONGODB_URI);

  let sandwichMenu = null;

  try {
    const database = client.db('amagat');
    const collection = database.collection('current-sandwich-menu');
    sandwichMenu = await collection.findOne() as SandwichMenu;

    translateSandwichMenu(sandwichMenu, language);
  } finally {
    await client.close();
  }

  let title;
  let footer;
  switch (language) {
    case "es":
      title = "Nuestra carta de bocadillos";
      footer = "Todos los precios incluyen el IVA. Si tenéis alguna ALERGIA o INTOLERANCIA, consultadnos, por favor";
      break;
    case "en":
      title = "Our selection of sandwiches";
      footer = "All prices include VAT. If you have any ALLERGIES or INTOLERANCES, please consult us";
      break;
    case "fi":
      title = "Voileipävalikoimamme";
      footer = "Kaikki hinnat sisältävät ALV:n. Jos sinulla on ALLERGIA tai INTOLERANSSI, ole hyvä ja kysy meiltä";
      break;
    case "ko":
      title = "우리의 샌드위치 메뉴";
      footer = "모든 가격은 부가가치세가 포함됩니다. 알레르기나 불내증이 있으신 경우, 상담해 주세요";
      break;
    default:
      title = "La nostra carta d'entrepans";
      footer = "Tots els preus inclouen l'IVA. Si teniu alguna AL·LÈRGIA o INTOLERÀNCIA, consulteu-nos, si us plau";
      break;
  }

  return {
    sandwichMenu: JSON.parse(JSON.stringify(sandwichMenu)),
    title: title,
    footer: footer,
    language: language,
  } as any
}) satisfies PageServerLoad;