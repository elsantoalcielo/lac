# 0002. Build the management pages on shared parts

- **Status:** accepted
- **Date:** 2026-11-01
- **Decided by:** project owner

## Context

The cafès page content is now in MongoDB (ADR 0001) and needs a management page. The lunch menu already has two editors (`/manage` for the menu, `/manage/dishes` for the catalogue) that were built separately: different looks, `contenteditable` fields, a raw JSON dump, and the same login check copied into each. `PUT /api/dishes`, `DELETE /api/dishes` and `PUT /api/current-menu` have no login check at all.

Editors are a fixed list of Google accounts (enforced by the Google login and `AUTHORIZED_USERS`), on both smartphones and computers. Translations are typed by hand. There is no draft for the cafès page (ADR 0001), so a save goes live at once.

## Decision

1. **Routes.** `/manage` becomes a hub; the editors live at `/manage/cafes`, `/manage/menu` and `/manage/dishes`. A `manage` layout (`+layout.server.ts`) does the login check once for all of them.
2. **Shared server helper.** One module in `$lib/server/` for: the authorised-user check, and a document save that validates the shape, checks a `version` number (a stale save is refused instead of overwriting), replaces the document and writes the previous version to history. All write endpoints use it, which also closes the unauthenticated writes.
3. **History.** A single `history` collection: `{ collection, savedAt, savedBy, document }`, one entry per save. The management pages list versions of the document being edited and can restore one (a restore is itself a save).
4. **Shared UI parts** in `$lib/components/manage/`: save bar (unsaved / saving / saved / error, and a warning when leaving with unsaved changes), a sortable item list with a drag handle that works with touch, a translations editor, a price field. The item fields stay specific to each page: a dish and a drink are different shapes, and a generic form builder would be more complex than both pages.
5. **Ordering by dragging** uses `svelte-dnd-action` (MIT, peer dependency covers Svelte 5, supports touch), through a drag handle only, so scrolling on a phone does not start a drag. Needs the owner's approval as a new dependency.
6. **Look.** Skeleton (already a dependency, v1) plus Tailwind, themed with the same sepia palette as the public pages; forms use real inputs, not `contenteditable`; the save bar is fixed to the bottom on phones. Items still at the placeholder price `9,99 €` get a visible badge.
7. **Menu semantics (first step).** The menu keeps embedding copies of dishes, so the public `carta` pages are unchanged. The menu editor shows when an embedded dish differs from its catalogue entry and offers to sync in either direction. Replacing copies with references is not part of this decision.

## Alternatives considered

- **A generic schema-driven form builder for every document:** rejected as more complex than two concrete pages.
- **One history collection per document type (`cafes-history`, …):** rejected; a single collection with a `collection` field is simpler to query and to prune.
- **SortableJS for dragging:** works, but mutates the DOM itself and fights Svelte's keyed lists; `svelte-dnd-action` fits Svelte's model.
- **Menu sections referencing dishes by `_id`:** cleaner model, but changes every public `carta` page and needs a migration of production data. Deferred.
- **Keeping `contenteditable`:** rejected; it mishandles paste and line breaks and is awkward on phones.

## Consequences

- One login check and one save path, so a new management page cannot forget either.
- Every save writes a history document. The documents are a few KB, so growth is negligible; pruning can be added later.
- Two editors saving at once: the second gets a "someone else changed this" message and must reload, instead of silently overwriting.
- Old URL: the current menu editor at `/manage` moves to `/manage/menu`. Bookmarks need redirecting, and the sign-in redirect in `hooks.server.ts` keeps pointing at `/manage`, which is now the hub.
- One new runtime dependency (`svelte-dnd-action`).
- Skeleton v1 is an old major version. Staying on it avoids a migration now but will need one eventually.

## Open questions

None. The owner approved the `svelte-dnd-action` dependency, the sync-not-references step for the menu, and the `version` check on 2026-11-01.

## Implementation notes

- Restoring a history entry fills the form; it only goes live when the editor presses save, which then creates a new version. This is slightly safer than the "a restore is itself a save" wording above.
- Dragging starts from the handle through capture-phase handlers (`onmousedowncapture`, `ontouchstartcapture`): Svelte 5 delegates the plain `onmousedown` and `ontouchstart`, which run after the library has already ignored the press.
