import type { Menu, SandwichMenu } from "./types";

type SkipList = {
  [language: string]: string[]
}

export function capitalize(source: string, language: string | null): string {
  const SKIP_LIST: SkipList = {
    ca: ['amb', 'de', 'i', 'o'],
    es: ['con', 'de', 'y', 'o'],
    en: ['with', 'of', 'and', 'or'],
    fr: ['avec', 'de', 'et', 'ou', 'au', 'aux', 'du'],
    fi: ['ja', 'tai']
  };

  const skipList = language ? SKIP_LIST[language] : SKIP_LIST.ca;
  if (skipList) {
    return source.split(' ').map((word) => skipList.indexOf(word) == -1 ? word.toUpperCase() : word).join(' ');
  }
  else {
    return source.toUpperCase();
  }
}

export function translateAndCapitalizeMenu(menu: Menu, language: string | null): void {

  if (language && language != "ca") {
    menu?.sections.forEach((section) => {
      if (section.translations && section.translations[language]) {
        section.title = section.translations[language].title || section.title;
      }

      section.dishes.forEach((dish) => {
        if (dish.translations && dish.translations[language]) {
          dish.name = dish.translations[language].name || dish.name;
          dish.description = dish.translations[language].description || dish.description;
        }
      })
    })
  }

  menu?.sections.forEach((section) => {
    if (section.title) {
      section.title = capitalize(section.title, language);
    }

    section.dishes.forEach((dish) => {
      dish.name = capitalize(dish.name, language);
      if (dish.description) {
        dish.description = capitalize(dish.description, language);
      }
    })
  })
}

export function translateSandwichMenu(sandwichMenu: SandwichMenu, language: string | null): void {

  if (language && language != "ca") {
    sandwichMenu?.sections.forEach((section) => {
      if (section.translations && section.translations[language]) {
        section.title = section.translations[language].title || section.title;
      }

      section.sandwiches.forEach((sandwich) => {
        if (sandwich.translations && sandwich.translations[language]) {
          sandwich.name = sandwich.translations[language].name || sandwich.name;
          sandwich.description = sandwich.translations[language].description || sandwich.description;
        }
      })
    })
  }
}

export enum AllergenName { gluten, crustaceans, eggs, fish, peanuts, soybeans, milk, nuts, celery, mustard, sesame, sulphites, molluscs };

export function translateAllergen(allergen: string, language: string | undefined): string {
  const TRANSLATIONS: { [language: string]: { [allergen: string]: string } } = {
    ca: {
      gluten: "Gluten",
      crustaceans: "Crustacis",
      eggs: "Ous",
      fish: "Peix",
      peanuts: "Cacauet",
      soybeans: "Soja",
      milk: "Làctics",
      nuts: "Fruits secs",
      celery: "Api",
      mustard: "Mostassa",
      sesame: "Llavors de sèsam",
      sulphites: "Sulfits",
      lupin: "Tramussos",
      molluscs: "Mol·luscs",
    },
    es: {
      gluten: "Gluten",
      crustaceans: "Crustáceos",
      eggs: "Huevos",
      fish: "Pescado",
      peanuts: "Cacahuete",
      soybeans: "Soja",
      milk: "Lácteos",
      nuts: "Frutos secos",
      celery: "Apio",
      mustard: "Mostaza",
      sesame: "Semillas de sésamo",
      sulphites: "Sulfitos",
      lupin: "Altramuces",
      molluscs: "Molluscos",
    },
    en: {
      gluten: "Gluten",
      crustaceans: "Crustaceans",
      eggs: "Eggs",
      fish: "Fish",
      peanuts: "Peanuts",
      soybeans: "Soybeans",
      milk: "Milk",
      nuts: "Nuts",
      celery: "Celery",
      mustard: "Mustard",
      sesame: "Sesame",
      sulphites: "Sulphites",
      lupin: "Lupin",
      molluscs: "Molluscs",
    },
    fr: {
      gluten: "Gluten",
      crustaceans: "Crustacés",
      eggs: "Oeufs",
      fish: "Poisson",
      peanuts: "Arachides",
      soybeans: "Soja",
      milk: "Lait",
      nuts: "Fruits à coques",
      celery: "Céleri",
      mustard: "Moutarde",
      sesame: "Sésame",
      sulphites: "Sulfites",
      lupin: "Lupin",
      molluscs: "Mollusques",
    },
    fi: {
      gluten: "Gluteeni",
      crustaceans: "Äyriäiset",
      eggs: "Kananmunat",
      fish: "Kala",
      peanuts: "Maapähkinät",
      soybeans: "Soijapavut",
      milk: "Maito",
      nuts: "Pähkinät",
      celery: "Selleri",
      mustard: "Sinappi",
      sesame: "Seesami",
      sulphites: "Sulfiitit",
      lupin: "Lupiini",
      molluscs: "Nilviäiset",
    },
    ko: {
      gluten: "글루텐",
      crustaceans: "갑각류",
      eggs: "계란",
      fish: "어류",
      peanuts: "땅콩",
      soybeans: "대두",
      milk: "우유",
      nuts: "견과류",
      celery: "셀러리",
      mustard: "겨자",
      sesame: "참깨",
      sulphites: "황산화물",
      lupin: "루팡",
      molluscs: "소라류"
    }
  }

  if (!language) {
    language = "ca";
  }

  return (TRANSLATIONS[language] && TRANSLATIONS[language][allergen]) || allergen;
}


export function translateOther(word: string, language: string | undefined): string {
  const TRANSLATIONS: { [language: string]: { [word: string]: string } } = {
    ca: {
      medium: "Mitjà",
      large: "Gran",
      barra: "Barra"
    },
    es: {
      medium: "Mediano",
      large: "Grande",
      barra: "Barra"
    },
    en: {
      medium: "Medium",
      large: "Large",
      barra: "French loaf"
    },
    fr: {
      medium: "Moyen",
      large: "Grand",
      barra: "Baguette"
    },
    fi: {
      medium: "Keskikokoinen",
      large: "Suuri",
      barra: "ranskalainen patonki"
    },
    ko: {
      medium: "중간",
      large: "큰",
      barra: "프렌치 로프"
    }
  }

  if (!language) {
    language = "ca";
  }

  return (TRANSLATIONS[language] && TRANSLATIONS[language][word]) || word;
}
