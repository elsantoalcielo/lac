import type { Menu } from "./types";

type SkipList = {
  [language: string]: string[]
}

export function capitalize(source: string, language: string | null): string {
  const SKIP_LIST: SkipList = {
    ca: ['amb', 'de', 'i', 'o'],
    es: ['con', 'de', 'y', 'o'],
    en: ['with', 'of', 'and', 'or'],
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

export function translateAndCapitalize(menu: Menu, language: string | null): void {

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
    }
  }

  if (!language) {
    language = "ca";
  }

  return (TRANSLATIONS[language] && TRANSLATIONS[language][allergen]) || allergen;
}