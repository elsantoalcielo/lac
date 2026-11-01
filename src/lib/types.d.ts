type Menu = {
  sections: Section[];
} | null;

type SandwichMenu = {
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
  price: {
    large: string,
    medium: string
  },
  allergens?: Allergen[];
  translations?: SandwichTranslations;
}

type CafesMenu = {
  _id?: string;
  version?: number;
  sections: CafesSection[];
} | null;

type CafesSection = {
  // Maps to the icon and layout hard-coded in the page: cafes, xocolates, tes, infusions
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