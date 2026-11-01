<script lang="ts">
  import type { CafesItem, CafesSection } from "$lib/types";
  import { PLACEHOLDER_PRICE } from "$lib/utils";
  import { cleanTranslations } from "$lib/manage/clean";
  import { putDocument } from "$lib/manage/save";
  import PageHeader from "$lib/components/manage/PageHeader.svelte";
  import UnsavedGuard from "$lib/components/manage/UnsavedGuard.svelte";
  import HistoryPanel from "$lib/components/manage/HistoryPanel.svelte";
  import SortableList from "$lib/components/manage/SortableList.svelte";
  import PriceInput from "$lib/components/manage/PriceInput.svelte";
  import TranslationsEditor from "$lib/components/manage/TranslationsEditor.svelte";
  import SaveBar from "$lib/components/manage/SaveBar.svelte";

  let { data } = $props();

  // Items get a client-side id so the list can be reordered; it is stripped before saving
  type Row = CafesItem & { id: string };
  type EditableSection = Omit<CafesSection, "items"> & { items: Row[] };
  type Status = { kind: "idle" | "saved" | "error" | "conflict"; text: string };

  let nextId = 0;
  const newId = () => `row-${nextId++}`;

  const toEditable = (sections: CafesSection[]): EditableSection[] =>
    JSON.parse(JSON.stringify(sections)).map((section: CafesSection) => ({ ...section, items: section.items.map((item) => ({ ...item, id: newId() })) }));

  const toSavable = (sections: EditableSection[]): CafesSection[] =>
    sections.map((section) => ({
      key: section.key,
      title: section.title.trim(),
      ...(section.note?.trim() ? { note: section.note.trim() } : {}),
      items: section.items.map((item) => ({
        name: item.name.trim(),
        price: item.price.trim(),
        ...(item.description?.trim() ? { description: item.description.trim() } : {}),
        ...(cleanTranslations(item.translations) ? { translations: cleanTranslations(item.translations) as DishTranslations } : {}),
      })),
      ...(cleanTranslations(section.translations) ? { translations: cleanTranslations(section.translations) as CafesSectionTranslations } : {}),
    }));

  // The form starts from the loaded document and is not re-synced from `data` afterwards
  // svelte-ignore state_referenced_locally
  const documentId = data.cafesMenu._id;
  // svelte-ignore state_referenced_locally
  let version = $state(data.cafesMenu.version ?? 0);
  // svelte-ignore state_referenced_locally
  let sections = $state(toEditable(data.cafesMenu.sections));
  // svelte-ignore state_referenced_locally
  let savedSnapshot = $state(JSON.stringify(toSavable(sections)));

  let saving = $state(false);
  let status = $state<Status>({ kind: "idle", text: "" });

  const dirty = $derived(JSON.stringify(toSavable(sections)) != savedSnapshot);
  const invalid = $derived(sections.some((section) => section.items.some((item) => !item.name.trim() || !item.price.trim())));
  const pendingPrices = $derived(sections.reduce((total, section) => total + section.items.filter((item) => item.price === PLACEHOLDER_PRICE).length, 0));

  const save = async () => {
    saving = true;
    status = { kind: "idle", text: "" };
    const result = await putDocument("/api/cafes", { _id: documentId, version, sections: toSavable(sections) });
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

  const addItem = (section: EditableSection) => {
    section.items.push({ id: newId(), name: "", price: "" });
  };

  const deleteItem = (section: EditableSection, item: Row) => {
    if (confirm(`Vols eliminar «${item.name || "element sense nom"}»?`)) {
      section.items = section.items.filter((other) => other.id != item.id);
    }
  };

  let historyOpen = $state(false);

  const loadVersion = (document: { sections: CafesSection[] }) => {
    if (dirty && !confirm("Hi ha canvis sense desar. Vols substituir-los per aquesta versió?")) return;
    sections = toEditable(document.sections);
    status = { kind: "idle", text: "" };
    historyOpen = false;
  };
</script>

<UnsavedGuard {dirty} />

<svelte:head>
  <title>Gestió de cafès · L'Amagat Cafè</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<div class="pb-28">

  <main class="mx-auto max-w-3xl space-y-8 px-4 py-6">
    <PageHeader title="Cafès i tes" description="Cafès, tes i infusions de la pàgina pública de cafès." publicHref="/cafes" />
    {#if pendingPrices > 0}
      <p class="rounded-lg border border-amber-300 bg-amber-100/70 px-4 py-3 text-amber-900">
        {pendingPrices} {pendingPrices == 1 ? "element té" : "elements tenen"} el preu pendent ({PLACEHOLDER_PRICE}). Es veu així a la pàgina pública fins que el canviïs.
      </p>
    {/if}

    {#each sections as section (section.key)}
      <section class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div class="mb-4 space-y-3">
          <label class="block">
            <span class="mb-1 block text-sm font-medium text-slate-700">Títol de la secció</span>
            <input class="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500" bind:value={section.title} />
          </label>
          {#if section.key == "cafes" || section.note !== undefined}
            <label class="block">
              <span class="mb-1 block text-sm font-medium text-slate-700">Nota sota la llista</span>
              <input class="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500" bind:value={section.note} />
            </label>
          {/if}
          <TranslationsEditor
            bind:translations={section.translations}
            fields={[
              { key: "title", label: "Títol" },
              ...(section.key == "cafes" || section.note !== undefined ? [{ key: "note", label: "Nota" }] : []),
            ]}
          />
        </div>

        <SortableList bind:items={section.items}>
          {#snippet children(item: Row)}
            <div class="grid gap-3 sm:grid-cols-[1fr_9rem]">
              <label class="block">
                <span class="mb-1 flex items-center gap-2 text-sm font-medium text-slate-700">
                  Nom
                  {#if !item.name.trim()}<span class="rounded-full bg-amber-200 px-2 py-0.5 text-[10px] normal-case tracking-normal text-amber-900">Falta</span>{/if}
                </span>
                <input
                  class="w-full rounded-md border bg-white px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 {item.name.trim() ? 'border-slate-300' : 'border-amber-400'}"
                  bind:value={item.name}
                />
              </label>
              <PriceInput bind:value={item.price} pendingValue={PLACEHOLDER_PRICE} />
              <label class="block sm:col-span-2">
                <span class="mb-1 block text-sm font-medium text-slate-700">Descripció</span>
                <input class="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500" bind:value={item.description} />
              </label>
            </div>
            <div class="flex items-start justify-between gap-2">
              <div class="min-w-0 flex-1">
                <TranslationsEditor
                  bind:translations={item.translations}
                  fields={[
                    { key: "name", label: "Nom" },
                    { key: "description", label: "Descripció" },
                  ]}
                />
              </div>
              <button type="button" class="mt-2 rounded-md px-3 py-1.5 text-sm text-red-700 hover:bg-red-50" onclick={() => deleteItem(section, item)}>Elimina</button>
            </div>
          {/snippet}
        </SortableList>

        <button type="button" class="mt-4 w-full rounded-lg border-2 border-dashed border-slate-300 py-3 font-semibold text-slate-600 hover:bg-slate-100" onclick={() => addItem(section)}>
          + Afegeix un element
        </button>
      </section>
    {/each}

    {#if historyOpen}
      <HistoryPanel collection="cafes" onload={loadVersion} />
    {/if}
  </main>
</div>

<SaveBar {dirty} {saving} {invalid} {status} onsave={save} onhistory={() => (historyOpen = !historyOpen)} />
