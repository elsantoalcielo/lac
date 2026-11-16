# 0005. Add the Sucs section to the cafès page

- **Status:** accepted
- **Date:** 2026-11-16
- **Decided by:** project owner

Extends ADR 0001. It changes one line of it: "The four sections are fixed". The rest of ADR 0001 still applies.

## Context

The client wants a new section, "Sucs", on the `/cafes` page, after Cafès and before Tes. ADR 0001 fixes the sections to `cafes`, `xocolates`, `tes` and `infusions`: the page picks the icon and placement by `key`, so a fifth section needs a code change and a decision.

The page has two columns, and the printed version is folded in half with one column per half (see the print rules in `src/routes/cafes/+page.svelte`). Cafès is in the left column and Tes in the right one, so "between them" has to be a column.

## Decision

Add a fifth fixed section with key `sucs`. It goes at the top of the right column, above Tes, with its own icon, drawn in the style of the other section icons.

- The section is stored like the others, as an entry in `sections` of the `cafes` document, with the same item shape (including `allergens` from ADR 0004) and the same translations.
- The page renders the section only when the document has it, like the other four, so the code can be deployed before the content is loaded.
- The editor already lists whatever `sections` the document has, so it needs no change; the section appears there once the entry exists.
- The initial entry is added to `scripts/cafes-seed.json` and inserted into the database by the project owner (agents do not load data). Items without a price from the client use the placeholder `9,99 €`.
- The print layout is measured again, because the right half grows.

## Alternatives considered

- **Under Cafès, in the left column:** rejected by the project owner. It pushes the tagline, the bird and Xocolates down, and the left half is already the taller one when printed.
- **A section list that staff can edit (add, remove, reorder sections):** rejected for now. It would need an icon picker or a default icon, and placement rules for a two-column layout; this is the first time a section is added, so it does not justify it.

## Consequences

- Staff cannot add or move sections themselves: a new section is a code change plus an ADR, as before.
- The right half of the printed menu is taller, so the print scale (and with it the text size on paper) may have to go down. This is checked when implementing.
- Until the entry is inserted into the database, the page and the editor show no Sucs section.
