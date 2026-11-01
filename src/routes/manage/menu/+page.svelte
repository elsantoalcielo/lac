<script lang="ts">
  import { cleanDish, cleanTranslations, sameDish } from "$lib/manage/clean";
  import { putDocument } from "$lib/manage/save";
  import ManageHeader from "$lib/components/manage/ManageHeader.svelte";
  import UnsavedGuard from "$lib/components/manage/UnsavedGuard.svelte";
  import HistoryPanel from "$lib/components/manage/HistoryPanel.svelte";
  import SortableList from "$lib/components/manage/SortableList.svelte";
  import DishFields from "$lib/components/manage/DishFields.svelte";
  import TranslationsEditor from "$lib/components/manage/TranslationsEditor.svelte";
  import SaveBar from "$lib/components/manage/SaveBar.svelte";

  let { data } = $props();

  // A dish in the menu is a copy of a catalogue dish. `_id` links it to the catalogue;
  // `id` only exists in this page so the list can be reordered.
  type Row = { id: string; _id?: string; name: string; price: string; description?: string; vegetarian?: boolean; featured?: boolean; allergens?: string[]; translations?: any; [field: string]: any };
  type EditableSection = { id: string; title?: string; translations?: any; dishes: Row[]; [field: string]: any };
  type Status = { kind: "idle" | "saved" | "error" | "conflict"; text: string };

  let nextId = 0;
  const newId = () => `row-${nextId++}`;

  const toRow = (dish: any): Row => ({ ...JSON.parse(JSON.stringify(dish)), id: newId(), name: String(dish.name ?? ""), price: String(dish.price ?? "") });

  const toEditable = (sections: any[]): EditableSection[] =>
    JSON.parse(JSON.stringify(sections)).map((section: any) => ({ ...section, id: newId(), dishes: (section.dishes ?? []).map(toRow) }));

  const toSavable = (sections: EditableSection[]) =>
    sections.map(({ id: _sectionId, dishes, translations, title, ...rest }) => {
      const cleanedTranslations = cleanTranslations(translations);
      return {
        ...rest,
        ...(title?.trim() ? { title: title.trim() } : {}),
        dishes: dishes.map(cleanDish),
        ...(cleanedTranslations ? { translations: cleanedTranslations } : {}),
      };
    });

  // The form starts from the loaded document and is not re-synced from `data` afterwards
  // svelte-ignore state_referenced_locally
  const documentId = data.menu._id;
  // svelte-ignore state_referenced_locally
  let version = $state(data.menu.version ?? 0);
  // svelte-ignore state_referenced_locally
  let sections = $state(toEditable(data.menu.sections));
  // svelte-ignore state_referenced_locally
  let savedSnapshot = $state(JSON.stringify(toSavable(sections)));
  // svelte-ignore state_referenced_locally
  let catalogue = $state<Row[]>(data.dishes.map(toRow));

  let saving = $state(false);
  let status = $state<Status>({ kind: "idle", text: "" });
  let historyOpen = $state(false);

  const dirty = $derived(JSON.stringify(toSavable(sections)) != savedSnapshot);
  const invalid = $derived(sections.some((section) => section.dishes.some((dish) => !dish.name.trim() || !dish.price.trim())));

  const save = async () => {
    saving = true;
    status = { kind: "idle", text: "" };
    const result = await putDocument("/api/current-menu", { _id: documentId, version, sections: toSavable(sections) });
    if (result.kind == "saved") {
      version = result.version;
      savedSnapshot = JSON.stringify(toSavable(sections));
      status = { kind: "saved", text: "Desat" };
    } else if (result.kind == "conflict") {
      status = { kind: "conflict", text: "Algú altre ha desat canvis. Recarrega la pàgina abans de continuar." };
    } else {
      status = { kind: "error", text: result.text };
    }
    saving = false;
  };

  // Catalogue sync
  type CatalogueStatus = "new" | "missing" | "same" | "differs";

  const catalogueStatus = (dish: Row): CatalogueStatus => {
    if (!dish._id) return "new";
    const original = catalogue.find((other) => other._id == dish._id);
    if (!original) return "missing";
    return sameDish(dish, original) ? "same" : "differs";
  };

  const syncMessage = $state({ text: "" });

  const saveToCatalogue = async (dish: Row) => {
    syncMessage.text = "";
    const response = await fetch("/api/dishes", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ data: cleanDish(dish) }),
    });
    if (!response.ok) {
      syncMessage.text = "No s'ha pogut desar al catàleg.";
      return;
    }
    const result = await response.json();
    if (!dish._id && result.id) dish._id = result.id;
    const copy = toRow(cleanDish(dish));
    const index = catalogue.findIndex((other) => other._id == dish._id);
    if (index == -1) catalogue.push(copy);
    else catalogue[index] = copy;
    syncMessage.text = `«${dish.name}» desat al catàleg.`;
  };

  const restoreFromCatalogue = (section: EditableSection, index: number) => {
    const original = catalogue.find((other) => other._id == section.dishes[index]._id);
    if (original) section.dishes[index] = toRow(original);
  };

  // Adding dishes
  let searches = $state<{ [sectionId: string]: string }>({});

  const matches = (section: EditableSection) => {
    const query = (searches[section.id] ?? "").trim().toLowerCase();
    if (!query) return [];
    return catalogue.filter((dish) => dish.name.toLowerCase().includes(query)).slice(0, 8);
  };

  const addBlank = (section: EditableSection) => {
    section.dishes.push({ id: newId(), name: "", price: "" });
  };

  const addFromCatalogue = (section: EditableSection, dish: Row) => {
    section.dishes.push(toRow(dish));
    searches[section.id] = "";
  };

  const deleteDish = (section: EditableSection, dish: Row) => {
    if (confirm(`Vols treure «${dish.name || "plat sense nom"}» de la carta? (No s'esborra del catàleg.)`)) {
      section.dishes = section.dishes.filter((other) => other.id != dish.id);
    }
  };

  const loadVersion = (document: { sections: any[] }) => {
    if (dirty && !confirm("Hi ha canvis sense desar. Vols substituir-los per aquesta versió?")) return;
    sections = toEditable(document.sections);
    status = { kind: "idle", text: "" };
    historyOpen = false;
  };
</script>

<UnsavedGuard {dirty} />

<svelte:head>
  <title>Gestió de la carta · L'Amagat Cafè</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<div class="min-h-screen bg-[#f3e8d0] pb-28 font-cormorant text-sepia-900">
  <ManageHeader title="Carta del dia" publicHref="/carta" />

  <main class="mx-auto max-w-3xl space-y-8 px-4 py-6">
    {#if data.collection != "current-menu"}
      <p class="rounded-lg border border-sepia-400/50 bg-[#f7eedb] px-4 py-3 text-sepia-800">Estàs editant l'esborrany ({data.collection}), no la carta pública.</p>
    {/if}

    {#if syncMessage.text}
      <p class="rounded-lg border border-green-300 bg-green-50 px-4 py-3 text-green-900" role="status">{syncMessage.text}</p>
    {/if}

    {#each sections as section (section.id)}
      <section class="rounded-xl border border-sepia-400/40 bg-[#f7eedb] p-4 shadow-sm sm:p-5">
        <div class="mb-4">
          <label class="block">
            <span class="mb-1 block text-xs font-semibold uppercase tracking-wider text-sepia-600">Títol de la secció</span>
            <input class="w-full rounded-md border border-sepia-400/50 bg-white px-3 py-2 text-xl font-bold focus:outline-none focus:ring-2 focus:ring-sepia-400" bind:value={section.title} />
          </label>
          <TranslationsEditor bind:translations={section.translations} fields={[{ key: "title", label: "Títol" }]} />
        </div>

        <SortableList bind:items={section.dishes}>
          {#snippet children(dish: Row, index: number)}
            {@const catalogueState = catalogueStatus(dish)}
            <DishFields bind:dish={section.dishes[index]} idPrefix={dish.id} />

            <div class="mt-3 flex flex-wrap items-center gap-2 border-t border-sepia-400/30 pt-2 text-sm">
              {#if catalogueState == "same"}
                <span class="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800">Igual que al catàleg</span>
              {:else if catalogueState == "differs"}
                <span class="rounded-full bg-amber-200 px-2 py-0.5 text-xs text-amber-900">Diferent del catàleg</span>
                <button type="button" class="rounded-md border border-sepia-400 px-2.5 py-1 hover:bg-sepia-200/40" onclick={() => saveToCatalogue(dish)}>Actualitza el catàleg</button>
                <button type="button" class="rounded-md border border-sepia-400 px-2.5 py-1 hover:bg-sepia-200/40" onclick={() => restoreFromCatalogue(section, index)}>Restaura del catàleg</button>
              {:else}
                <span class="rounded-full bg-sepia-200/60 px-2 py-0.5 text-xs text-sepia-800">{catalogueState == "new" ? "No és al catàleg" : "Ja no és al catàleg"}</span>
                <button type="button" class="rounded-md border border-sepia-400 px-2.5 py-1 hover:bg-sepia-200/40 disabled:opacity-40" disabled={!dish.name.trim() || !dish.price.trim()} onclick={() => saveToCatalogue(dish)}>Desa al catàleg</button>
              {/if}
              <button type="button" class="ml-auto rounded-md px-3 py-1 text-red-700 hover:bg-red-50" onclick={() => deleteDish(section, dish)}>Treu de la carta</button>
            </div>
          {/snippet}
        </SortableList>

        <div class="mt-4 space-y-2">
          <button type="button" class="w-full rounded-lg border-2 border-dashed border-sepia-400/70 py-3 font-semibold text-sepia-700 hover:bg-sepia-200/30" onclick={() => addBlank(section)}>+ Plat nou</button>
          <div class="relative">
            <input
              class="w-full rounded-md border border-sepia-400/50 bg-white px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-sepia-400"
              type="search"
              placeholder="Afegeix un plat del catàleg…"
              aria-label="Cerca al catàleg"
              bind:value={searches[section.id]}
            />
            {#if matches(section).length > 0}
              <ul class="mt-1 divide-y divide-sepia-400/20 overflow-hidden rounded-md border border-sepia-400/40 bg-white shadow-sm">
                {#each matches(section) as match (match._id)}
                  <li>
                    <button type="button" class="flex w-full items-center justify-between gap-3 px-3 py-2 text-left hover:bg-sepia-200/30" onclick={() => addFromCatalogue(section, match)}>
                      <span class="truncate">{match.name}</span>
                      <span class="shrink-0 lining-nums tabular-nums text-sepia-600">{match.price} €</span>
                    </button>
                  </li>
                {/each}
              </ul>
            {/if}
          </div>
        </div>
      </section>
    {/each}

    {#if historyOpen}
      <HistoryPanel collection={data.collection} onload={loadVersion} />
    {/if}
  </main>
</div>

<SaveBar {dirty} {saving} {invalid} {status} onsave={save} onhistory={() => (historyOpen = !historyOpen)} />

<style>
  @import url(../../../../static/fonts/fonts.css);
</style>
