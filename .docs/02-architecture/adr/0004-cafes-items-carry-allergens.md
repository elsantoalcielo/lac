# 0004. Cafès items carry allergens

- **Status:** accepted
- **Date:** 2026-11-12
- **Decided by:** project owner

Extends the document shape of ADR 0001. The rest of ADR 0001 still applies.

## Context

The client sent a Xocolates section with allergens for some products. Cafès items had no allergens, and the `/cafes` page showed none.

## Decision

`CafesItem` gains an optional `allergens: string[]`, using the same names as dishes and sandwiches (`gluten`, `milk`, `sulphites`…). The list lives in `ALLERGENS` (`src/lib/utils.ts`), shared by the editor's `AllergenPicker` and the server check, which rejects unknown names.

- The public page shows the icons after the item name, styled like the sandwich page.
- The legend at the bottom lists only the allergens some item has, translated, and is hidden when none has any. The sandwich page uses a fixed list; this content is editable, so the legend follows the data.
- The editor shows an "Al·lèrgens" picker per item, folded by default.

Products with two sizes are stored as two items (for example "Xocolata a la tassa" and "Xocolata a la tassa petita"); there is no second price field.

## Alternatives considered

- **No allergens on the cafès page:** rejected by the project owner; the client provided them.
- **A fixed legend, like the sandwich page:** rejected; it would drift from the content as staff edit it.
- **A second price field for small sizes:** rejected by the project owner in favour of separate items, which needs no code change.

## Consequences

- An item without allergens shows no icons, which readers may take as "allergen-free". Allergens must be confirmed with the client rather than left empty by default.
- The editor must keep `allergens` when saving. Before this change it rebuilt each item field by field, so a save from an older editor deletes them; the live data gets allergens only after this change is deployed.
- Allergens apply to every section, so coffees, teas and infusions can get theirs later without a code change.
