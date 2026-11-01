// Shape checks for what the management pages send. Light on purpose: they stop broken
// or hostile bodies at the boundary without rejecting legacy data the pages round-trip.
const MAX_TEXT_LENGTH = 1000;

export const isText = (value: unknown): value is string => typeof value === 'string' && value.length <= MAX_TEXT_LENGTH;

const isOptionalText = (value: unknown) => value === undefined || isText(value);

const isTranslations = (value: unknown) =>
  value === undefined ||
  (typeof value === 'object' && value !== null && Object.values(value).every((fields) => typeof fields === 'object' && fields !== null && Object.values(fields).every(isText)));

export const isValidCafesItem = (item: any): boolean => isText(item?.name) && item.name.length > 0 && isText(item?.price) && isOptionalText(item.description) && isTranslations(item.translations);

export const isValidCafesSection = (section: any): boolean =>
  isText(section?.key) && isText(section?.title) && isOptionalText(section.note) && Array.isArray(section.items) && section.items.every(isValidCafesItem) && isTranslations(section.translations);

export const isValidDish = (dish: any): boolean =>
  isText(dish?.name) &&
  dish.name.length > 0 &&
  isText(dish?.price) &&
  isOptionalText(dish.description) &&
  (dish.vegetarian === undefined || typeof dish.vegetarian === 'boolean') &&
  (dish.featured === undefined || typeof dish.featured === 'boolean') &&
  (dish.allergens === undefined || (Array.isArray(dish.allergens) && dish.allergens.every(isText))) &&
  isTranslations(dish.translations);

export const isValidMenuSection = (section: any): boolean =>
  isOptionalText(section?.title) && Array.isArray(section.dishes) && section.dishes.every(isValidDish) && isTranslations(section.translations);
