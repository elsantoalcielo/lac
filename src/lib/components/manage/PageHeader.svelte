<script lang="ts">
  let { title, description, publicHref }: { title: string; description?: string; publicHref?: string } = $props();
</script>

<div class="mb-6 flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
  <div class="min-w-0">
    <h1 class="text-2xl font-semibold text-slate-900">{title}</h1>
    {#if description}<p class="mt-1 text-sm text-slate-600">{description}</p>{/if}
  </div>
  {#if publicHref}
    <a class="shrink-0 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50" href={publicHref} target="_blank" rel="noopener">Veure la pàgina ↗</a>
  {/if}
</div>
