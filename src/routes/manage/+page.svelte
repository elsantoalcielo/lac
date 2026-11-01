<script lang="ts">
  import ManageHeader from "$lib/components/manage/ManageHeader.svelte";

  let { data } = $props();

  const pages = [
    { href: "/manage/menu", title: "Carta del dia", text: "Els plats de cada secció, l'ordre, els preus i les traduccions." },
    { href: "/manage/cafes", title: "Cafès i tes", text: "Cafès, tes i infusions de la pàgina de cafès." },
    { href: "/manage/dishes", title: "Catàleg de plats", text: "Tots els plats desats, per reutilitzar-los a la carta." },
  ];
</script>

<svelte:head>
  <title>Gestió · L'Amagat Cafè</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<div class="min-h-screen bg-[#f3e8d0] font-cormorant text-sepia-900">
  <ManageHeader title="Gestió" hub />

  <main class="mx-auto max-w-3xl px-4 py-8">
    <p class="mb-6 text-sepia-700">Has entrat com a {data.email}.</p>
    <div class="grid gap-4 sm:grid-cols-3">
      {#each pages as page}
        <a class="block rounded-xl border border-sepia-400/40 bg-[#f7eedb] p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md" href={page.href}>
          <h2 class="mb-2 text-xl font-bold">{page.title}</h2>
          <p class="text-sepia-700">{page.text}</p>
        </a>
      {/each}
    </div>
  </main>
</div>

<style>
  @import url(../../../static/fonts/fonts.css);
</style>
