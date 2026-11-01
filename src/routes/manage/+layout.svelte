<script lang="ts">
  import { page } from "$app/state";
  import { signOut } from "@auth/sveltekit/client";

  let { data, children } = $props();

  const links = [
    { href: "/manage", label: "Inici" },
    { href: "/manage/menu", label: "Carta del dia" },
    { href: "/manage/cafes", label: "Cafès i tes" },
    { href: "/manage/dishes", label: "Catàleg" },
  ];

  const isActive = (href: string) => (href == "/manage" ? page.url.pathname == "/manage" : page.url.pathname.startsWith(href));
</script>

<div class="min-h-screen bg-slate-100 font-sans text-slate-900 antialiased">
  <nav class="bg-slate-900 text-slate-200 shadow">
    <div class="mx-auto flex max-w-4xl flex-wrap items-center gap-x-6 gap-y-1 px-4 py-2">
      <a class="py-1 text-sm font-semibold tracking-wide text-white" href="/manage">L'Amagat Cafè <span class="font-normal text-slate-400">· Gestió</span></a>
      <div class="order-last -mx-1 flex w-full gap-1 overflow-x-auto sm:order-none sm:mx-0 sm:w-auto sm:flex-1">
        {#each links as link}
          <a
            class="shrink-0 whitespace-nowrap rounded-md px-3 py-1.5 text-sm {isActive(link.href) ? 'bg-slate-700 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}"
            href={link.href}
            aria-current={isActive(link.href) ? "page" : undefined}
          >
            {link.label}
          </a>
        {/each}
      </div>
      <div class="ml-auto flex items-center gap-3 text-sm">
        <span class="hidden max-w-[14rem] truncate text-slate-400 xl:inline">{data.email}</span>
        <button type="button" class="rounded-md border border-slate-600 px-3 py-1 text-slate-200 hover:bg-slate-800" onclick={() => signOut()}>Tanca la sessió</button>
      </div>
    </div>
  </nav>

  {@render children()}
</div>
