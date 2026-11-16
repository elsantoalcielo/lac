type Menu = {
  sections: Section[];
} | null;

type SandwichMenu = {
  _id?: string;
  version?: number;
  sections: SandwichSection[];
} | null;

type Section = {
  title?: string;
  dishes: Dish[];
  translations?: SectionTranslation
}

type SandwichSection = {
  title?: string;
  sandwiches: Sandwich[];
  translations?: SectionTranslation
}

export type SectionTranslation = {
  [language: string]: {
    title: string;
  }
}

type Dish = {
  name: string;
  description?: string;
  price: string;
  vegetarian?: boolean;
  allergens?: Allergen[];
  featured?: boolean;
  translations?: DishTranslations;
}

type Sandwich = {
  name: string;
  description?: string;
  // Stored without the € sign; sandwiches with one size have no medium price
  price: {
    large: string,
    medium?: string
  },
  // Names from ALLERGENS in $lib/utils
  allergens?: string[];
  // A word for translateOther shown under the large price, e.g. "barra"
  large_variant?: string;
  translations?: SandwichTranslations;
}

type CafesMenu = {
  _id?: string;
  version?: number;
  sections: CafesSection[];
  // Shown on the page as typed, one line per line; hidden when missing
  tagline?: string;
  translations?: CafesMenuTranslations;
} | null;

type CafesSection = {
  // Maps to the icon and layout hard-coded in the page: cafes, xocolates, sucs, tes, infusions
  key: string;
  title: string;
  note?: string;
  items: CafesItem[];
  translations?: CafesSectionTranslations;
}

type CafesItem = {
  name: string;
  price: string;
  description?: string;
  // Names from ALLERGENS in $lib/utils
  allergens?: string[];
  translations?: DishTranslations;
}

interface MongoDBIded {
  _id: string;
}

interface PersistentDish extends Dish, MongoDBIded {}

// https://github.com/sveltejs/kit/issues/3766
declare global {
  type DishTranslations = {
    [language: string]: {
      name: string;
      description: string;
    }
  }
}

declare global {
  type SandwichTranslations = DishTranslations
}

declare global {
  type CafesSectionTranslations = {
    [language: string]: {
      title: string;
      note?: string;
    }
  }

  type CafesMenuTranslations = {
    [language: string]: {
      tagline?: string;
    }
  }
}

enum Allergen {
  gluten,
  crustaceans,
  eggs,
  fish,
  peanuts,
  soybeans,
  milk,
  nuts,
  celery,
  mustard,
  sesame,
  sulphites,
  lupin,
  molluscs,
}