<script lang="ts">
  import { cleanDish } from "$lib/manage/clean";
  import ManageHeader from "$lib/components/manage/ManageHeader.svelte";
  import UnsavedGuard from "$lib/components/manage/UnsavedGuard.svelte";
  import DishFields from "$lib/components/manage/DishFields.svelte";

  let { data } = $props();

  // `id` only exists in this page; `_id` is the database id, missing until a new dish is saved
  type Row = { id: string; startOpen?: boolean; _id?: string; name: string; price: string; description?: string; vegetarian?: boolean; featured?: boolean; allergens?: string[]; translations?: any; [field: string]: any };

  let nextId = 0;
  const toRow = (dish: any): Row => ({ ...JSON.parse(JSON.stringify(dish)), id: `row-${nextId++}`, name: String(dish.name ?? ""), price: String(dish.price ?? "") });
  const snapshotOf = (row: Row) => JSON.stringify(cleanDish(row));


  // svelte-ignore state_referenced_locally
  let rows = $state<Row[]>(data.dishes.map(toRow));
  // svelte-ignore state_referenced_locally
  let snapshots = $state<{ [id: string]: string }>(Object.fromEntries(rows.map((row) => [row.id, snapshotOf(row)])));
  let busy = $state<{ [id: string]: boolean }>({});
  let messages = $state<{ [id: string]: string }>({});
  let filter = $state("");

  const isDirty = (row: Row) => snapshots[row.id] != snapshotOf(row);
  const isInvalid = (row: Row) => !row.name.trim() || !row.price.trim();
  const anyDirty = $derived(rows.some(isDirty));

  const visible = $derived(rows.filter((row) => !filter.trim() || row.name.toLowerCase().includes(filter.trim().toLowerCase()) || !row._id));

  const addDish = () => {
    filter = "";
    const row = { id: `row-${nextId++}`, startOpen: true, name: "", price: "" };
    rows.unshift(row);
    snapshots[row.id] = "";
  };

  const save = async (row: Row) => {
    busy[row.id] = true;
    messages[row.id] = "";
    try {
      const response = await fetch("/api/dishes", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ data: cleanDish(row) }),
      });
      if (!response.ok) throw new Error();
      const result = await response.json();
      if (!row._id && result.id) row._id = result.id;
      snapshots[row.id] = snapshotOf(row);
      messages[row.id] = "Desat";
    } catch {
      messages[row.id] = "No s'ha pogut desar. Torna-ho a provar.";
    } finally {
      busy[row.id] = false;
    }
  };

  const remove = async (row: Row) => {
    if (!confirm(`Vols esborrar «${row.name || "plat sense nom"}» del catàleg? Les cartes que ja el tenen no es canvien.`)) return;
    if (row._id) {
      busy[row.id] = true;
      try {
        const response = await fetch("/api/dishes", {
          method: "DELETE",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ data: { _id: row._id } }),
        });
        if (!response.ok) throw new Error();
      } catch {
        messages[row.id] = "No s'ha pogut esborrar. Torna-ho a provar.";
        busy[row.id] = false;
        return;
      }
    }
    rows = rows.filter((other) => other.id != row.id);
  };
</script>

<UnsavedGuard dirty={anyDirty} />

<svelte:head>
  <title>Catàleg de plats · L'Amagat Cafè</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<div class="min-h-screen bg-[#f3e8d0] pb-16 font-cormorant text-sepia-900">
  <ManageHeader title="Catàleg de plats" />

  <main class="mx-auto max-w-3xl px-4 py-6">
    <div class="sticky top-0 z-10 -mx-4 mb-4 flex gap-2 bg-[#f3e8d0]/95 px-4 py-3 backdrop-blur">
      <input
        class="min-w-0 flex-1 rounded-md border border-sepia-400/50 bg-white px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-sepia-400"
        type="search"
        placeholder="Cerca un plat…"
        aria-label="Cerca un plat"
        bind:value={filter}
      />
      <button type="button" class="shrink-0 rounded-md bg-sepia-800 px-4 py-2 font-semibold text-amber-50 hover:bg-sepia-700" onclick={addDish}>+ Plat nou</button>
    </div>

    <p class="mb-3 text-sm text-sepia-700">{rows.length} plats al catàleg. Cada plat es desa pel seu compte.</p>

    <div class="space-y-3">
      {#each visible as row (row.id)}
        <details class="group rounded-lg border border-sepia-400/40 bg-[#f7eedb] shadow-sm" open={row.startOpen}>
          <summary class="flex cursor-pointer list-none items-center gap-3 px-4 py-3">
            <svg class="h-4 w-4 shrink-0 transition-transform group-open:rotate-90" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M7 4l6 6-6 6V4z" /></svg>
            <span class="min-w-0 flex-1 truncate text-lg font-semibold">{row.name || "Plat nou"}</span>
            {#if isDirty(row)}<span class="shrink-0 rounded-full bg-amber-200 px-2 py-0.5 text-xs text-amber-900">Sense desar</span>{/if}
            <span class="shrink-0 lining-nums tabular-nums text-sepia-700">{row.price ? `${row.price} €` : ""}</span>
          </summary>
          <div class="border-t border-sepia-400/30 px-4 pb-4 pt-3">
            <DishFields bind:dish={rows[rows.indexOf(row)]} idPrefix={row.id} />
            <div class="mt-4 flex items-center gap-3 border-t border-sepia-400/30 pt-3">
              <button
                type="button"
                class="rounded-md bg-sepia-800 px-5 py-2 font-semibold text-amber-50 hover:bg-sepia-700 disabled:cursor-not-allowed disabled:opacity-40"
                disabled={!isDirty(row) || isInvalid(row) || busy[row.id]}
                onclick={() => save(row)}
              >
                {busy[row.id] ? "Desant…" : "Desa"}
              </button>
              <span class="min-w-0 flex-1 truncate text-sm {messages[row.id]?.startsWith('No') ? 'font-semibold text-red-700' : 'text-green-800'}" role="status">{messages[row.id] ?? ""}</span>
              <button type="button" class="rounded-md px-3 py-1.5 text-sm text-red-700 hover:bg-red-50" disabled={busy[row.id]} onclick={() => remove(row)}>Esborra</button>
            </div>
          </div>
        </details>
      {/each}
    </div>
  </main>
</div>

<style>
  @import url(../../../../static/fonts/fonts.css);
</style>
