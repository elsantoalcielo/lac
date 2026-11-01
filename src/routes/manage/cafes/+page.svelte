<script lang="ts">
  import { beforeNavigate } from "$app/navigation";
  import { signOut } from "@auth/sveltekit/client";
  import type { CafesItem, CafesSection } from "$lib/types";
  import { PLACEHOLDER_PRICE } from "$lib/utils";
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

  // Drops empty translations and blank optional fields, so the stored document stays tidy
  const cleanTranslations = <T extends { [language: string]: { [field: string]: string | undefined } }>(translations: T | undefined) => {
    const cleaned: { [language: string]: { [field: string]: string } } = {};
    for (const [language, fields] of Object.entries(translations ?? {})) {
      const kept = Object.fromEntries(Object.entries(fields).filter(([, text]) => text && text.trim() != "").map(([key, text]) => [key, text!.trim()]));
      if (Object.keys(kept).length > 0) cleaned[language] = kept;
    }
    return Object.keys(cleaned).length > 0 ? cleaned : undefined;
  };

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
    try {
      const response = await fetch("/api/cafes", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ data: { _id: documentId, version, sections: toSavable(sections) } }),
      });
      if (response.ok) {
        version = (await response.json()).version;
        savedSnapshot = JSON.stringify(toSavable(sections));
        status = { kind: "saved", text: "Desat" };
      } else if (response.status == 409) {
        status = { kind: "conflict", text: "Algú altre ha desat canvis. Recarrega la pàgina abans de continuar." };
      } else {
        status = { kind: "error", text: "No s'ha pogut desar. Torna-ho a provar." };
      }
    } catch {
      status = { kind: "error", text: "No hi ha connexió. Torna-ho a provar." };
    } finally {
      saving = false;
    }
  };

  const addItem = (section: EditableSection) => {
    section.items.push({ id: newId(), name: "", price: "" });
  };

  const deleteItem = (section: EditableSection, item: Row) => {
    if (confirm(`Vols eliminar «${item.name || "element sense nom"}»?`)) {
      section.items = section.items.filter((other) => other.id != item.id);
    }
  };

  // History: loading a version only fills the form; it becomes the live page when saved
  type HistoryEntry = { _id: string; version: number; replacedAt: string; replacedBy: string; document: { sections: CafesSection[] } };
  let historyOpen = $state(false);
  let history = $state<HistoryEntry[]>([]);
  let historyError = $state("");

  const toggleHistory = async () => {
    historyOpen = !historyOpen;
    if (!historyOpen) return;
    historyError = "";
    try {
      const response = await fetch("/api/history?collection=cafes");
      if (!response.ok) throw new Error();
      history = await response.json();
    } catch {
      historyError = "No s'ha pogut carregar l'historial.";
    }
  };

  const loadVersion = (entry: HistoryEntry) => {
    if (dirty && !confirm("Hi ha canvis sense desar. Vols substituir-los per aquesta versió?")) return;
    sections = toEditable(entry.document.sections);
    status = { kind: "idle", text: "" };
    historyOpen = false;
  };

  const formatDate = (iso: string) => new Date(iso).toLocaleString("ca-ES", { dateStyle: "medium", timeStyle: "short" });

  beforeNavigate(({ cancel }) => {
    if (dirty && !confirm("Hi ha canvis sense desar. Vols sortir igualment?")) cancel();
  });
</script>

<svelte:window onbeforeunload={(event) => dirty && event.preventDefault()} />

<svelte:head>
  <title>Gestió de cafès · L'Amagat Cafè</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<div class="min-h-screen bg-[#f3e8d0] pb-28 font-cormorant text-sepia-900">
  <header class="border-b border-sepia-400/50 bg-[#f7eedb]">
    <div class="mx-auto flex max-w-3xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-4">
      <h1 class="flex-1 text-2xl font-bold tracking-wide">Cafès i tes</h1>
      <a class="text-sm underline decoration-sepia-400 underline-offset-4 hover:text-sepia-700" href="/cafes" target="_blank" rel="noopener">Veure la pàgina</a>
      <button type="button" class="text-sm underline decoration-sepia-400 underline-offset-4 hover:text-sepia-700" onclick={() => signOut()}>Tanca la sessió</button>
    </div>
  </header>

  <main class="mx-auto max-w-3xl space-y-8 px-4 py-6">
    {#if pendingPrices > 0}
      <p class="rounded-lg border border-amber-300 bg-amber-100/70 px-4 py-3 text-amber-900">
        {pendingPrices} {pendingPrices == 1 ? "element té" : "elements tenen"} el preu pendent ({PLACEHOLDER_PRICE}). Es veu així a la pàgina pública fins que el canviïs.
      </p>
    {/if}

    {#each sections as section (section.key)}
      <section class="rounded-xl border border-sepia-400/40 bg-[#f7eedb] p-4 shadow-sm sm:p-5">
        <div class="mb-4 space-y-3">
          <label class="block">
            <span class="mb-1 block text-xs font-semibold uppercase tracking-wider text-sepia-600">Títol de la secció</span>
            <input class="w-full rounded-md border border-sepia-400/50 bg-white px-3 py-2 text-xl font-bold focus:outline-none focus:ring-2 focus:ring-sepia-400" bind:value={section.title} />
          </label>
          {#if section.key == "cafes" || section.note !== undefined}
            <label class="block">
              <span class="mb-1 block text-xs font-semibold uppercase tracking-wider text-sepia-600">Nota sota la llista</span>
              <input class="w-full rounded-md border border-sepia-400/50 bg-white px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-sepia-400" bind:value={section.note} />
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
                <span class="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sepia-600">
                  Nom
                  {#if !item.name.trim()}<span class="rounded-full bg-amber-200 px-2 py-0.5 text-[10px] normal-case tracking-normal text-amber-900">Falta</span>{/if}
                </span>
                <input
                  class="w-full rounded-md border bg-white px-3 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-sepia-400 {item.name.trim() ? 'border-sepia-400/50' : 'border-amber-400'}"
                  bind:value={item.name}
                />
              </label>
              <PriceInput bind:value={item.price} />
              <label class="block sm:col-span-2">
                <span class="mb-1 block text-xs font-semibold uppercase tracking-wider text-sepia-600">Descripció</span>
                <input class="w-full rounded-md border border-sepia-400/50 bg-white px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-sepia-400" bind:value={item.description} />
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

        <button type="button" class="mt-4 w-full rounded-lg border-2 border-dashed border-sepia-400/70 py-3 font-semibold text-sepia-700 hover:bg-sepia-200/30" onclick={() => addItem(section)}>
          + Afegeix un element
        </button>
      </section>
    {/each}

    {#if historyOpen}
      <section class="rounded-xl border border-sepia-400/40 bg-[#f7eedb] p-4 shadow-sm sm:p-5" aria-live="polite">
        <h2 class="mb-1 text-xl font-bold">Historial</h2>
        <p class="mb-3 text-sm text-sepia-700">Cada vegada que deses, la versió anterior es guarda aquí. Carregar-ne una omple el formulari, però no canvia la pàgina pública fins que premis «Desa».</p>
        {#if historyError}
          <p class="text-red-700">{historyError}</p>
        {:else if history.length == 0}
          <p class="text-sepia-700">Encara no hi ha cap versió anterior.</p>
        {:else}
          <ul class="divide-y divide-sepia-400/30">
            {#each history as entry (entry._id)}
              <li class="flex items-center justify-between gap-3 py-2">
                <div class="min-w-0 text-sm">
                  <div class="font-semibold">{formatDate(entry.replacedAt)}</div>
                  <div class="truncate text-sepia-700">Substituïda per {entry.replacedBy}</div>
                </div>
                <button type="button" class="shrink-0 rounded-md border border-sepia-400 px-3 py-1.5 text-sm hover:bg-sepia-200/40" onclick={() => loadVersion(entry)}>Carrega</button>
              </li>
            {/each}
          </ul>
        {/if}
      </section>
    {/if}
  </main>
</div>

<SaveBar {dirty} {saving} {invalid} {status} onsave={save} onhistory={toggleHistory} />

<style>
  @import url(../../../../static/fonts/fonts.css);
</style>
