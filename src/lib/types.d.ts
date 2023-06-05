type Menu = {
  sections: Section[];
} | null;

type Section = {
  title?: string;
  dishes: Dish[];
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