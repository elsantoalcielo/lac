<script lang="ts">
  import { onMount } from "svelte";

  type Entry = { _id: string; version: number; replacedAt: string; replacedBy: string; document: any };

  // Loading a version only fills the form: it goes live when the editor saves
  let { collection, onload }: { collection: string; onload: (document: any) => void } = $props();

  let entries = $state<Entry[]>([]);
  let error = $state("");
  let loading = $state(true);

  onMount(async () => {
    try {
      const response = await fetch(`/api/history?collection=${encodeURIComponent(collection)}`);
      if (!response.ok) throw new Error();
      entries = await response.json();
    } catch {
      error = "No s'ha pogut carregar l'historial.";
    } finally {
      loading = false;
    }
  });

  const formatDate = (iso: string) => new Date(iso).toLocaleString("ca-ES", { dateStyle: "medium", timeStyle: "short" });
</script>

<section class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5" aria-live="polite">
  <h2 class="mb-1 text-xl font-bold">Historial</h2>
  <p class="mb-3 text-sm text-slate-600">Cada vegada que deses, la versió anterior es guarda aquí. Carregar-ne una omple el formulari, però no canvia la pàgina pública fins que premis «Desa».</p>
  {#if loading}
    <p class="text-slate-600">Carregant…</p>
  {:else if error}
    <p class="text-red-700">{error}</p>
  {:else if entries.length == 0}
    <p class="text-slate-600">Encara no hi ha cap versió anterior.</p>
  {:else}
    <ul class="divide-y divide-slate-200">
      {#each entries as entry (entry._id)}
        <li class="flex items-center justify-between gap-3 py-2">
          <div class="min-w-0 text-sm">
            <div class="font-semibold">{formatDate(entry.replacedAt)}</div>
            <div class="truncate text-slate-600">Substituïda per {entry.replacedBy}</div>
          </div>
          <button type="button" class="shrink-0 rounded-md border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-100" onclick={() => onload(entry.document)}>Carrega</button>
        </li>
      {/each}
    </ul>
  {/if}
</section>
