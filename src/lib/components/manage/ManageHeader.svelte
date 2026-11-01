<script lang="ts">
  import { signOut } from "@auth/sveltekit/client";

  let { title, publicHref, hub = false }: { title: string; publicHref?: string; hub?: boolean } = $props();
</script>

<header class="border-b border-sepia-400/50 bg-[#f7eedb]">
  <div class="mx-auto flex max-w-3xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-4">
    {#if !hub}
      <a class="text-sm underline decoration-sepia-400 underline-offset-4 hover:text-sepia-700" href="/manage">← Gestió</a>
    {/if}
    <h1 class="flex-1 text-2xl font-bold tracking-wide">{title}</h1>
    {#if publicHref}
      <a class="text-sm underline decoration-sepia-400 underline-offset-4 hover:text-sepia-700" href={publicHref} target="_blank" rel="noopener">Veure la pàgina</a>
    {/if}
    <button type="button" class="text-sm underline decoration-sepia-400 underline-offset-4 hover:text-sepia-700" onclick={() => signOut()}>Tanca la sessió</button>
  </div>
</header>
