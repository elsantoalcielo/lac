<script lang="ts">
  import type { Sandwich, SandwichSection } from "$lib/types";
  import { translateOther } from "$lib/utils";
  import { cleanTranslations } from "$lib/manage/clean";
  import { putDocument } from "$lib/manage/save";
  import PageHeader from "$lib/components/manage/PageHeader.svelte";
  import UnsavedGuard from "$lib/components/manage/UnsavedGuard.svelte";
  import HistoryPanel from "$lib/components/manage/HistoryPanel.svelte";
  import SortableList from "$lib/components/manage/SortableList.svelte";
  import PriceInput from "$lib/components/manage/PriceInput.svelte";
  import TranslationsEditor from "$lib/components/manage/TranslationsEditor.svelte";
  import AllergenPicker from "$lib/components/manage/AllergenPicker.svelte";
  import SaveBar from "$lib/components/manage/SaveBar.svelte";

  let { data } = $props();

  // Rows and sections get a client-side id so they can be reordered; it is stripped before saving.
  // Both prices are always strings in the form; an empty medium price is left out when saving.
  type Row = Omit<Sandwich, "price"> & { id: string; price: { medium: string; large: string }; [field: string]: any };
  type EditableSection = { id: string; title?: string; translations?: any; sandwiches: Row[]; [field: string]: any };
  type Status = { kind: "idle" | "saved" | "error" | "conflict"; text: string };

  // Words translateOther knows for the note under the large price
  const LARGE_VARIANTS = ["barra"];

  let nextId = 0;
  const newId = () => `row-${nextId++}`;

  const toRow = (sandwich: Sandwich): Row => ({
    ...sandwich,
    id: newId(),
    price: { medium: sandwich.price?.medium ?? "", large: sandwich.price?.large ?? "" },
    large_variant: sandwich.large_variant ?? "",
  });

  const toEditable = (sections: SandwichSection[]): EditableSection[] =>
    JSON.parse(JSON.stringify(sections)).map((section: SandwichSection) => ({ ...section, id: newId(), sandwiches: (section.sandwiches ?? []).map(toRow) }));

  // A sandwich as it is stored: trimmed, without empty optionals. Unknown fields are kept.
  const toSavableSandwich = ({ id: _id, name, price, description, allergens, large_variant, translations, ...rest }: Row) => {
    const cleanedTranslations = cleanTranslations(translations);
    return {
      ...rest,
      name: name.trim(),
      price: { ...(price.medium.trim() ? { medium: price.medium.trim() } : {}), large: price.large.trim() },
      ...(description?.trim() ? { description: description.trim() } : {}),
      ...(allergens?.length ? { allergens } : {}),
      ...(large_variant ? { large_variant } : {}),
      ...(cleanedTranslations ? { translations: cleanedTranslations } : {}),
    };
  };

  const toSavable = (sections: EditableSection[]) =>
    sections.map(({ id: _id, sandwiches, title, translations, ...rest }) => {
      const cleanedTranslations = cleanTranslations(translations);
      return {
        ...rest,
        ...(title?.trim() ? { title: title.trim() } : {}),
        sandwiches: sandwiches.map(toSavableSandwich),
        ...(cleanedTranslations ? { translations: cleanedTranslations } : {}),
      };
    });

  // The form starts from the loaded document and is not re-synced from `data` afterwards
  // svelte-ignore state_referenced_locally
  const documentId = data.sandwichMenu._id;
  // svelte-ignore state_referenced_locally
  let version = $state(data.sandwichMenu.version ?? 0);
  // svelte-ignore state_referenced_locally
  let sections = $state(toEditable(data.sandwichMenu.sections));
  // svelte-ignore state_referenced_locally
  let savedSnapshot = $state(JSON.stringify(toSavable(sections)));

  let saving = $state(false);
  let status = $state<Status>({ kind: "idle", text: "" });
  let historyOpen = $state(false);

  const dirty = $derived(JSON.stringify(toSavable(sections)) != savedSnapshot);
  const invalid = $derived(sections.some((section) => section.sandwiches.some((sandwich) => !sandwich.name.trim() || !sandwich.price.large.trim())));

  const save = async () => {
    saving = true;
    status = { kind: "idle", text: "" };
    const result = await putDocument("/api/sandwiches", { _id: documentId, version, sections: toSavable(sections) });
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

  const addSection = () => {
    sections.push({ id: newId(), title: "", sandwiches: [] });
  };

  const moveSection = (index: number, offset: number) => {
    const [moved] = sections.splice(index, 1);
    sections.splice(index + offset, 0, moved);
  };

  const deleteSection = (section: EditableSection) => {
    const count = section.sandwiches.length;
    if (confirm(`Vols eliminar la secció «${section.title?.trim() || "sense títol"}»${count ? ` i els seus ${count} elements` : ""}?`)) {
      sections = sections.filter((other) => other.id != section.id);
    }
  };

  const addSandwich = (section: EditableSection) => {
    section.sandwiches.push({ id: newId(), name: "", price: { medium: "", large: "" }, large_variant: "" });
  };

  const deleteSandwich = (section: EditableSection, sandwich: Row) => {
    if (confirm(`Vols eliminar «${sandwich.name || "element sense nom"}»?`)) {
      section.sandwiches = section.sandwiches.filter((other) => other.id != sandwich.id);
    }
  };

  const loadVersion = (document: { sections: SandwichSection[] }) => {
    if (dirty && !confirm("Hi ha canvis sense desar. Vols substituir-los per aquesta versió?")) return;
    sections = toEditable(document.sections);
    status = { kind: "idle", text: "" };
    historyOpen = false;
  };
</script>

<UnsavedGuard {dirty} />

<svelte:head>
  <title>Gestió d'entrepans · L'Amagat Cafè</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<div class="pb-28">

  <main class="mx-auto max-w-3xl space-y-8 px-4 py-6">
    <PageHeader title="Entrepans" description="Entrepans, extres i els seus preus de la pàgina pública d'entrepans." publicHref="/entrepans" />

    {#each sections as section, sectionIndex (section.id)}
      <section class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div class="mb-4 space-y-3">
          <label class="block">
            <span class="mb-1 block text-sm font-medium text-slate-700">Títol de la secció</span>
            <input class="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500" bind:value={section.title} />
            <span class="mt-1 block text-sm text-slate-600">Si el deixes buit, la secció surt sense títol.</span>
          </label>
          <TranslationsEditor bind:translations={section.translations} fields={[{ key: "title", label: "Títol" }]} />
          <div class="flex flex-wrap gap-2 text-sm">
            <button type="button" class="rounded-md border border-slate-300 px-3 py-1.5 hover:bg-slate-100 disabled:opacity-40" disabled={sectionIndex == 0} onclick={() => moveSection(sectionIndex, -1)}>↑ Puja</button>
            <button type="button" class="rounded-md border border-slate-300 px-3 py-1.5 hover:bg-slate-100 disabled:opacity-40" disabled={sectionIndex == sections.length - 1} onclick={() => moveSection(sectionIndex, 1)}>↓ Baixa</button>
            <button type="button" class="ml-auto rounded-md px-3 py-1.5 text-red-700 hover:bg-red-50" onclick={() => deleteSection(section)}>Elimina la secció</button>
          </div>
        </div>

        <SortableList bind:items={section.sandwiches}>
          {#snippet children(sandwich: Row)}
            <div class="grid gap-3 sm:grid-cols-[1fr_8rem_8rem]">
              <label class="block">
                <span class="mb-1 flex items-center gap-2 text-sm font-medium text-slate-700">
                  Nom
                  {#if !sandwich.name.trim()}<span class="rounded-full bg-amber-200 px-2 py-0.5 text-[10px] normal-case tracking-normal text-amber-900">Falta</span>{/if}
                </span>
                <input
                  class="w-full rounded-md border bg-white px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 {sandwich.name.trim() ? 'border-slate-300' : 'border-amber-400'}"
                  bind:value={sandwich.name}
                />
              </label>
              <div>
                <PriceInput bind:value={sandwich.price.medium} label="Preu mitjà" currency={false} />
                {#if !sandwich.price.medium.trim()}<span class="mt-1 block text-xs text-slate-500">Buit: només mida gran</span>{/if}
              </div>
              <PriceInput bind:value={sandwich.price.large} label="Preu gran" currency={false} />
              <label class="block sm:col-span-2">
                <span class="mb-1 block text-sm font-medium text-slate-700">Descripció</span>
                <input class="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500" bind:value={sandwich.description} />
              </label>
              <label class="block">
                <span class="mb-1 block text-sm font-medium text-slate-700">Nota mida gran</span>
                <select class="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500" bind:value={sandwich.large_variant}>
                  <option value="">Cap</option>
                  {#each LARGE_VARIANTS as variant}
                    <option value={variant}>{translateOther(variant, "ca")}</option>
                  {/each}
                  {#if sandwich.large_variant && !LARGE_VARIANTS.includes(sandwich.large_variant)}
                    <option value={sandwich.large_variant}>{sandwich.large_variant}</option>
                  {/if}
                </select>
              </label>
            </div>
            <div class="flex items-start justify-between gap-2">
              <div class="min-w-0 flex-1">
                <details class="group mt-2">
                  <summary class="flex cursor-pointer list-none items-center gap-2 text-sm text-slate-600 hover:text-slate-900">
                    <svg class="h-4 w-4 transition-transform group-open:rotate-90" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M7 4l6 6-6 6V4z" /></svg>
                    Al·lèrgens
                    {#if sandwich.allergens?.length}<span class="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-800">{sandwich.allergens.length}</span>{/if}
                  </summary>
                  <div class="mt-3">
                    <AllergenPicker bind:values={sandwich.allergens} />
                  </div>
                </details>
                <TranslationsEditor
                  bind:translations={sandwich.translations}
                  fields={[
                    { key: "name", label: "Nom" },
                    { key: "description", label: "Descripció" },
                  ]}
                />
              </div>
              <button type="button" class="mt-2 rounded-md px-3 py-1.5 text-sm text-red-700 hover:bg-red-50" onclick={() => deleteSandwich(section, sandwich)}>Elimina</button>
            </div>
          {/snippet}
        </SortableList>

        <button type="button" class="mt-4 w-full rounded-lg border-2 border-dashed border-slate-300 py-3 font-semibold text-slate-600 hover:bg-slate-100" onclick={() => addSandwich(section)}>
          + Afegeix un element
        </button>
      </section>
    {/each}

    <button type="button" class="w-full rounded-lg border-2 border-dashed border-slate-400 py-3 font-semibold text-slate-700 hover:bg-slate-100" onclick={addSection}>
      + Afegeix una secció
    </button>

    {#if historyOpen}
      <HistoryPanel collection="current-sandwich-menu" onload={loadVersion} />
    {/if}
  </main>
</div>

<SaveBar {dirty} {saving} {invalid} {status} onsave={save} onhistory={() => (historyOpen = !historyOpen)} />
