<script lang="ts">
  import Corner from "$lib/components/corner.svelte";

  import Language from "$lib/components/language.svelte";
  import type { CafesItem } from "$lib/types";

  export let data;

  // The sections are keyed: the icons and layout below are fixed per key
  $: sections = Object.fromEntries(data.cafesMenu?.sections.map((section) => [section.key, section]) ?? []);

  const fleurDeLis =
    "M12,2 C11.5,5 9.5,7 8,8 C6.5,7 4.5,7.5 4,9.5 C3.5,12 6,13.5 7.5,13.5 C9,13.5 10,12.5 10.5,11.5 C10.8,13 10.5,15.5 8,16.5 L8,18 L10.5,18 C11,18 11.5,19 12,21 C12.5,19 13,18 13.5,18 L16,18 L16,16.5 C13.5,15.5 13.2,13 13.5,11.5 C14,12.5 15,13.5 16.5,13.5 C18,13.5 20.5,12 20,9.5 C19.5,7.5 17.5,7 16,8 C14.5,7 12.5,5 12,2 Z";
</script>

{#snippet row(item: CafesItem)}
  <div class="menu-item">
    <span class="name">{item.name}</span>
    <span class="leader" /><span class="price">{item.price}</span>
  </div>
  {#if item.description}<p class="description">{item.description}</p>{/if}
{/snippet}

<svelte:head>
  <title>Cafès · L'Amagat Cafè</title>
</svelte:head>

<div class="bg-stone-300 min-h-screen py-6 px-2 sm:px-4 flex items-center justify-center font-cormorant text-sepia-900 antialiased selection:bg-amber-900 selection:text-amber-100">
  <main class="w-full max-w-[850px] bg-aged-paper menu-shadow rounded-sm relative p-4 sm:p-6 md:p-10 border border-sepia-400/40">
    <!-- Ornate double outer border -->
    <div class="border-[1.5px] border-sepia-700/80 p-1 sm:p-2 relative h-full">
      <div class="border border-sepia-600/60 p-4 sm:p-6 md:p-8 relative">
        <Corner filled class="-top-3.5 -left-3.5" />
        <Corner class="-top-3.5 -right-3.5 rotate-90" />
        <Corner class="-bottom-3.5 -left-3.5 -rotate-90" />
        <Corner class="-bottom-3.5 -right-3.5 rotate-180" />

        <div class="language flex justify-end">
          <Language language={data.language} />
        </div>

        <header class="flex justify-center pt-2 pb-6 md:pb-8">
          <div class="logo bg-sepia-900" role="img" aria-label="L'Amagat Cafè" />
        </header>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative">
          <div class="hidden md:block absolute left-1/2 top-4 bottom-8 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-sepia-700/40 to-transparent" />

          <!-- Left column: Cafès & Xocolates -->
          <div class="flex flex-col space-y-6 sm:space-y-8">
            {#if sections.cafes}
            <section>
              <div class="flex items-center gap-3 mb-3 pb-1 border-b border-sepia-400/40">
                <svg class="w-7 h-7 text-sepia-800 shrink-0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" viewBox="0 0 64 64">
                  <path d="M14 26 C14 42 22 47 34 47 C46 47 54 42 54 26 L14 26 Z" />
                  <path d="M54 30 C58 30 61 33 61 37 C61 41 57 43 53 43" />
                  <ellipse cx="34" cy="53" rx="26" ry="5" />
                  <path d="M26 19 C25 15 28 13 27 9" stroke-width="1.8" />
                  <path d="M34 20 C33 16 36 14 35 10" stroke-width="1.8" />
                  <path d="M42 19 C41 15 44 13 43 9" stroke-width="1.8" />
                </svg>
                <h2 class="text-xl sm:text-2xl font-bold tracking-[0.2em] text-sepia-900 uppercase">{sections.cafes.title}</h2>
              </div>
              <div class="text-base sm:text-[17px] text-sepia-900 leading-relaxed font-normal">
                {#each sections.cafes.items as item}
                  {@render row(item)}
                {/each}
                {#if sections.cafes.note}<p class="description mt-2">{sections.cafes.note}</p>{/if}
              </div>
            </section>
            {/if}

            <div class="text-center py-2 px-4">
              <p class="font-script text-2xl sm:text-3xl text-sepia-800 leading-snug">
                El bon cafè<br />sempre sap millor<br />en bona companyia
              </p>
              <div class="flex justify-center items-center gap-2 mt-2 text-sepia-700/80">
                <span class="w-8 h-[1px] bg-sepia-600/50" />
                <span class="text-xs">♦</span>
                <span class="w-8 h-[1px] bg-sepia-600/50" />
              </div>
            </div>

            <img class="w-44 md:w-52 mx-auto -mt-2" src="/img/bird_coffee_sepia.png" width="450" height="600" alt="" loading="lazy" />

            {#if sections.xocolates}
            <section>
              <div class="flex items-center gap-3 mb-3 pb-1 border-b border-sepia-400/40">
                <svg class="w-7 h-7 text-sepia-800 shrink-0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" viewBox="0 0 64 64">
                  <path d="M16 28 C16 43 24 48 34 48 C44 48 52 43 52 28 Z" />
                  <path d="M52 32 C56 32 59 34 59 38 C59 42 56 44 52 44" />
                  <ellipse cx="34" cy="53" rx="22" ry="4.5" />
                  <circle cx="34" cy="38" fill="currentColor" r="2" />
                </svg>
                <h2 class="text-xl sm:text-2xl font-bold tracking-[0.2em] text-sepia-900 uppercase">{sections.xocolates.title}</h2>
              </div>
              <div class="text-base sm:text-[17px] text-sepia-900 leading-relaxed font-normal">
                {#each sections.xocolates.items as item}
                  {@render row(item)}
                {/each}
              </div>
            </section>
            {/if}

          </div>

          <!-- Right column: Tes, Infusions & teacup -->
          <div class="flex flex-col space-y-6 sm:space-y-8">
            {#if sections.tes}
            <section>
              <div class="flex items-center gap-3 mb-3 pb-1 border-b border-sepia-400/40">
                <svg class="w-7 h-7 text-sepia-800 shrink-0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.3" viewBox="0 0 64 64">
                  <path d="M22 24 C22 18 42 18 42 24 L44 38 C44 48 20 48 20 38 Z" />
                  <path d="M32 18 L32 14 C32 12 34 11 36 11" />
                  <path d="M20 30 C12 28 8 36 18 41" />
                  <path d="M44 28 C56 26 58 40 43 43" />
                  <ellipse cx="32" cy="49" rx="14" ry="2.5" />
                </svg>
                <h2 class="text-xl sm:text-2xl font-bold tracking-[0.2em] text-sepia-900 uppercase">{sections.tes.title}</h2>
              </div>
              <div class="text-base sm:text-[17px] text-sepia-900 leading-relaxed font-normal">
                {#each sections.tes.items as item}
                  {@render row(item)}
                {/each}
              </div>
            </section>
            {/if}

            {#if sections.infusions}
            <section class="border border-sepia-600/70 p-4 sm:p-5 rounded-sm relative mt-2 bg-sepia-200/10">
              <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-aged-paper px-2 text-sepia-800">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d={fleurDeLis} />
                </svg>
              </div>
              <span class="absolute top-1 left-1 w-2 h-2 border-t border-l border-sepia-700" />
              <span class="absolute top-1 right-1 w-2 h-2 border-t border-r border-sepia-700" />
              <span class="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-sepia-700" />
              <span class="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-sepia-700" />
              <h3 class="text-center font-bold tracking-[0.25em] text-sepia-900 text-sm sm:text-base uppercase mb-3">{sections.infusions.title}</h3>
              <div class="text-base sm:text-[17px] text-sepia-900 leading-relaxed font-normal">
                {#each sections.infusions.items as item}
                  {@render row(item)}
                {/each}
              </div>
            </section>
            {/if}

            <div class="text-center pt-2 px-2">
              <p class="font-script text-2xl sm:text-3xl text-sepia-800 leading-snug">
                La vida<br />també es gaudeix<br />en tassa
              </p>
              <div class="flex justify-center items-center mt-2 text-sepia-700/80">
                <span class="text-sm">✤</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </main>
</div>

<style>
  @import url(../../../static/fonts/fonts.css);

  .bg-aged-paper {
    background-color: #f7eedb;
    background-image: radial-gradient(ellipse at 50% 50%, rgba(255, 255, 255, 0.45) 0%, rgba(243, 229, 203, 0.4) 60%, rgba(216, 193, 155, 0.7) 100%),
      radial-gradient(circle at 10% 10%, rgba(200, 172, 134, 0.35) 0%, transparent 40%),
      radial-gradient(circle at 90% 90%, rgba(195, 166, 128, 0.4) 0%, transparent 40%),
      radial-gradient(circle at 90% 10%, rgba(195, 166, 128, 0.35) 0%, transparent 40%),
      radial-gradient(circle at 10% 90%, rgba(195, 166, 128, 0.4) 0%, transparent 40%);
  }

  /* The logo is black on transparent: use it as a mask so it takes the sepia fill */
  .logo {
    width: 11rem;
    aspect-ratio: 496 / 426;
    -webkit-mask: url(/img/logo.png) center / contain no-repeat;
    mask: url(/img/logo.png) center / contain no-repeat;
  }

  @media (min-width: 768px) {
    .logo {
      width: 14rem;
    }
  }

  /* The selector is a shared component with no styles of its own: dress it as part of the menu */
  .language :global(select) {
    font-family: inherit;
    font-size: 1rem;
    color: #2b1a11;
    background-color: transparent;
    border: 1px solid rgba(120, 88, 66, 0.6);
    border-radius: 2px;
    padding: 0.15rem 0.4rem;
    cursor: pointer;
  }

  /* The open list is not transparent-friendly: give it the flat paper colour */
  .language :global(option) {
    background-color: #f7eedb;
    color: #2b1a11;
  }

  .language :global(select:focus-visible) {
    outline: 1.5px solid #785842;
    outline-offset: 2px;
  }

  .menu-shadow {
    box-shadow: 0 15px 40px -10px rgba(71, 46, 27, 0.35), 0 0 0 1px rgba(100, 68, 42, 0.15);
  }

  .menu-item {
    display: flex;
    align-items: baseline;
    position: relative;
    margin-bottom: 0.22rem;
  }

  .menu-item .name {
    background-color: transparent;
    position: relative;
    z-index: 1;
    padding-right: 0.3rem;
    white-space: nowrap;
  }

  .menu-item .leader {
    flex-grow: 1;
    border-bottom: 1.5px dotted #785842;
    position: relative;
    bottom: 0.28em;
    margin: 0 0.2rem;
    opacity: 0.8;
  }

  .description {
    font-style: italic;
    font-size: 0.9em;
    line-height: 1.3;
    opacity: 0.8;
    margin-bottom: 0.45rem;
  }

  .menu-item .price {
    background-color: transparent;
    position: relative;
    z-index: 1;
    padding-left: 0.3rem;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }
</style>
