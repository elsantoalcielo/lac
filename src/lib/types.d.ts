type Menu = {
  sections: Section[];
} | null;

type Section = {
  title?: string;
  dishes: Dish[];
  translations?: {
    [language: string]: {
      title: string;
    }
  }
}

type Dish = {
  name: string;
  description?: string;
  price: string;
  vegetarian?: boolean;
  allergens?: Allergen[];
  featured?: boolean;
  translations?: {
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