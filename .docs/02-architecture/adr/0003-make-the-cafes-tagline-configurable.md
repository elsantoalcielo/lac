# 0003. Make the cafès tagline configurable

- **Status:** accepted
- **Date:** 2026-11-12
- **Decided by:** project owner

Supersedes the part of ADR 0001 that keeps taglines in code. The rest of ADR 0001 still applies.

## Context

ADR 0001 kept the `/cafes` page's script taglines hard-coded. One of the two was removed; the owner wants the remaining one ("El bon cafè / sempre sap millor / en bona companyia") editable from `/manage/cafes`, with translations, like the rest of the page's content.

## Decision

Store the tagline in the existing `cafes` document:

```ts
type CafesMenu = {
  sections: CafesSection[];
  tagline?: string;   // Catalan, plain text; each "\n" is a line on the page
  translations?: { [language: string]: { tagline?: string } };
  ...
};
```

- Document-level `translations` follows the same `{ [language]: { field } }` convention as sections and items, so the existing validation, cleaning and translations editor apply unchanged. More page-level texts can join it later.
- The page renders the text with `white-space: pre-line`, not as HTML, so editors cannot inject markup.
- An empty or missing tagline hides the block, its ornament included. There is no hard-coded fallback (as in ADR 0001).
- A language without a translation shows the Catalan text.
- It is saved with the sections through the same `PUT /api/cafes`, version check and history (ADR 0002).

## Alternatives considered

- **A separate `page-texts` / `settings` collection:** rejected for now. It adds a second read, endpoint and save (two versions and two history entries for one edit) to hold a single string. Worth revisiting if several pages get configurable texts.
- **Storing it as a section `note` or a fake section:** rejected; it is not a section and the page places it between sections.
- **A `taglineTranslations` map of plain strings:** rejected; it would need its own validator, cleaner and editor.

## Consequences

- Staff can change or translate the tagline without a deploy.
- The live document has no tagline until someone types it in the editor (or the owner adds it to the database), so the block is hidden on `/cafes` from deployment until then.
- Every save of the cafès editor must send the tagline, because a save replaces the whole document.
- Loading a history version saved before this change clears the tagline in the form, since that version had none.
- The seed (`scripts/cafes-seed.json`) includes the Catalan tagline.
