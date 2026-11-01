# 0001. Store the cafès page content in MongoDB

- **Status:** accepted
- **Date:** 2026-10-31
- **Decided by:** project owner

## Context

The `/cafes` page (coffees, chocolates, teas and infusions) has its items and prices hard-coded in `src/routes/cafes/+page.svelte`. The café staff need to change them without a deploy, and a management page for it is planned (later stage, not part of this decision).

The lunch menu already follows a pattern: a `dishes` catalogue plus one `current-menu` / `draft-menu` document with embedded sections, read with `findOne()` and replaced whole by a `PUT` endpoint. The cafès page does not need the draft/current split. `/cafes` has different needs: its content is stable, small and has no reuse between menus.

## Decision

Store the page content as a single document in one collection, `cafes`, in the `amagat` database. There is no draft: the public page and the future management page read and write the same document, so an edit goes live immediately.

Document shape (types go in `src/lib/types.d.ts`):

```ts
type CafesMenu = { sections: CafesSection[] } | null;

type CafesSection = {
  key: string;            // maps to the hard-coded icon and layout: cafes, xocolates, tes, infusions
  title: string;
  note?: string;          // e.g. the soy/oat milk supplement line
  items: CafesItem[];     // array order is display order
  translations?: { [language: string]: { title: string; note?: string } };
};

type CafesItem = {
  name: string;
  price: string;          // string like Dish.price, e.g. "1,80 €"; "9,99 €" is the placeholder where the client has not given one
  description?: string;
  translations?: { [language: string]: { name: string; description?: string } };
};
```

Translations follow the existing `DishTranslations` / `SectionTranslation` convention and the locales in `src/lib/languages.ts`. Catalan is the base language stored in the plain fields.

Layout, SVG icons and taglines stay in code; only the content is in the database. The four sections are fixed: the page picks icon and placement by `key`, and the future management page edits items, not the section list.

The page reads the document in a `+page.server.ts` through `getDb()` (`src/lib/server/mongo.ts`). If the document is missing or the database is unreachable, the page shows an error (no hard-coded fallback).

Translations: Catalan is the default. When the selected language has no translation for a field, the page shows the Catalan text.

Prices: every item has a price. Where the client has not provided one, the seed uses the placeholder `9,99 €` (comma, like the other prices) so it is visible and easy to find and replace.

The initial document is a seed JSON built from the client's list, inserted by the project owner (agents do not load real data into any database).

## Alternatives considered

- **Catalogue collection plus a menu referencing it (like `dishes`):** rejected, because drinks are not reused across menus and it adds a second collection and consistency to keep.
- **One document per item:** rejected, because ordering and sections would need extra fields and the page always reads all of it.
- **Keep the data in the repo (JSON file):** rejected, because every price change would need a deploy.
- **Draft and current collections (like the menu):** rejected by the project owner; the extra publish step is not wanted for this page.
- **Hard-coded fallback if the database fails:** rejected for now, because it would show stale prices and duplicate the data.

## Consequences

- Staff can change content without a deploy once the management page exists; until then, edits are made directly in the database. With no draft, a mistaken edit is visible to the public immediately.
- The public `/cafes` page now depends on MongoDB being reachable, like the menu pages.
- Adding a section means a code change (icon and layout), not only data.
- A language only needs its `translations` filled in where it differs; anything missing shows in Catalan.
- The placeholder `9,99 €` will be public on every item the client has not priced (all the teas, most infusions, four coffees) until real prices replace it.
- The chocolates in the current page have invented prices and are not in the client's list. They are left out of the seed until the client supplies real ones.

## Open questions

None. Real prices from the client are still pending (see Consequences).
