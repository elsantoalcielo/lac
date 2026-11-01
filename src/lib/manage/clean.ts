type Translations = { [language: string]: { [field: string]: string | undefined } };

// Drops empty translations, so the stored documents stay tidy
export function cleanTranslations(translations: Translations | undefined) {
  const cleaned: { [language: string]: { [field: string]: string } } = {};
  for (const [language, fields] of Object.entries(translations ?? {})) {
    const kept = Object.fromEntries(
      Object.entries(fields)
        .filter(([, text]) => text && text.trim() != "")
        .map(([key, text]) => [key, text!.trim()])
    );
    if (Object.keys(kept).length > 0) cleaned[language] = kept;
  }
  return Object.keys(cleaned).length > 0 ? cleaned : undefined;
}

// A dish as it is stored: trimmed, without client-only fields and without empty optionals.
// Unknown fields are kept, so nothing the old editor stored is lost.
export function cleanDish(dish: { [field: string]: any }) {
  const { id: _clientId, startOpen: _startOpen, translations, ...rest } = dish;
  const cleaned: { [field: string]: any } = { ...rest, name: String(rest.name ?? "").trim(), price: String(rest.price ?? "").trim() };
  if (!cleaned.description?.trim()) delete cleaned.description;
  else cleaned.description = cleaned.description.trim();
  if (!cleaned.vegetarian) delete cleaned.vegetarian;
  if (!cleaned.featured) delete cleaned.featured;
  if (!cleaned.allergens?.length) delete cleaned.allergens;
  const cleanedTranslations = cleanTranslations(translations);
  if (cleanedTranslations) cleaned.translations = cleanedTranslations;
  return cleaned;
}

// Two dishes are the same when everything stored about them matches, ignoring the id
export function sameDish(a: { [field: string]: any }, b: { [field: string]: any }) {
  const { _id: _a, ...left } = cleanDish(a);
  const { _id: _b, ...right } = cleanDish(b);
  const normalize = (dish: { [field: string]: any }) =>
    JSON.stringify(Object.fromEntries(Object.entries({ ...dish, allergens: dish.allergens ? [...dish.allergens].sort() : undefined }).sort(([x], [y]) => x.localeCompare(y))));
  return normalize(left) == normalize(right);
}
