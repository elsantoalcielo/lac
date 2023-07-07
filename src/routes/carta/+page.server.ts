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
    const collection = database.collection(process.env.NODE_ENV == 'development' ? 'draft-menu' : 'current-menu');
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
    case "fr":
      title = "Notre proposition gastronomique";
      footer = "Tous les prix incluent la TVA. Si vous avez des ALLERGIES ou des INTOLÉRANCES, veuillez nous consulter, s'il vous plaît";
      break;
    case "de":
      title = "Unser gastronomischer Vorschlag";
      footer = "Alle Preise enthalten die Mehrwertsteuer. Wenn Sie ALLERGIEN oder UNVERTRÄGLICHKEITEN haben, konsultieren Sie uns bitte";
      break;
    case "it":
      title = "La nostra proposta gastronomica";
      footer = "Tutti i prezzi includono l'IVA. Se avete qualche ALLERGIA o INTOLLERANZA, vi preghiamo di consultarci";
      break;
    case "fi":
      title = "Gastronominen ehdotuksemme";
      footer = "Kaikki hinnat sisältävät ALV:n. Jos sinulla on ALLERGIA tai INTOLERANSSI, ole hyvä ja kysy meiltä";
      break;
    case "ko":
      title = "우리의 요리 제안";
      footer = "모든 가격은 부가가치세가 포함됩니다. 알레르기나 불내증이 있으신 경우, 상담해 주세요";
      break;
    case "ga":
      title = "A nosa proposta gastronómica";
      footer = "Todos os prezos inclúen o IVE. Se tedes algunha ALERXIA ou INTOLERANCIA, consultade con nós, por favor";
      break;
    case "eu":
      title = "Gure gastronomia proposamena";
      footer = "Prezio guztiak BEZa barne dute. ALERGIA edo INTOLERANTZIA bat baduzue, mesedez, galdetu gaitzazue";
      break;
    default:
      title = "Gure gastronomia proposamena";
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