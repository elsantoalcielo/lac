<script lang="ts">
  import PageHeader from "$lib/components/manage/PageHeader.svelte";

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

<main class="mx-auto max-w-3xl px-4 py-6">
  <PageHeader title="Gestió" description="Tria què vols editar." />

  <div class="grid gap-4 sm:grid-cols-3">
    {#each pages as page}
      <a class="block rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-400 hover:shadow" href={page.href}>
        <h2 class="mb-1 font-semibold text-slate-900">{page.title}</h2>
        <p class="text-sm text-slate-600">{page.text}</p>
      </a>
    {/each}
  </div>
</main>
