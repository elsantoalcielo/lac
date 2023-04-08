type Menu = {
  sections: Section[];
}

type Section = {
  title?: string;
  dishes: Dish[];
}

type Dish = {
  name: string;
  description?: string;
  price: string;
  vegetarian?: boolean;
  allergens?: Allergen[];
  featured?: boolean;
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