<script lang="ts">
  import Corner from "$lib/components/corner.svelte";
  import Language from "$lib/components/language.svelte";
  import Opengraph from "$lib/components/opengraph.svelte";
  import { translateAllergen, translateOther } from "$lib/utils";
  import type { PageData } from "./$types";
  export let data: PageData;

  const { sandwichMenu, title, footer, language } = data;

  const legendAllergens = ["gluten", "eggs", "fish", "milk", "sesame"];

  const fleurDeLis =
    "M12,2 C11.5,5 9.5,7 8,8 C6.5,7 4.5,7.5 4,9.5 C3.5,12 6,13.5 7.5,13.5 C9,13.5 10,12.5 10.5,11.5 C10.8,13 10.5,15.5 8,16.5 L8,18 L10.5,18 C11,18 11.5,19 12,21 C12.5,19 13,18 13.5,18 L16,18 L16,16.5 C13.5,15.5 13.2,13 13.5,11.5 C14,12.5 15,13.5 16.5,13.5 C18,13.5 20.5,12 20,9.5 C19.5,7.5 17.5,7 16,8 C14.5,7 12.5,5 12,2 Z";
</script>

<svelte:head>
  <title>L'Amagat Cafè - {title}</title>
  <meta name="description" content="Lloc petit i bufó al cor del Guinardó. Proposta senzilla però feta amb amor. Cafè, entrepans, plats, i bona atenció" />
  <Opengraph title="L'Amagat Cafè - {title}" path="entrepans{language ? '?l=' + language : ''}" />
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

        <header class="flex flex-col items-center pt-2 pb-6 md:pb-8">
          <a href="/" aria-label="L'Amagat Cafè">
            <div class="logo bg-sepia-900" role="img" aria-label="L'Amagat Cafè" />
          </a>
          {#if sandwichMenu.title}
            <p class="font-script text-2xl sm:text-3xl text-sepia-800 leading-snug text-center mt-3">{sandwichMenu.title}</p>
          {/if}
        </header>

        <div class="flex flex-col space-y-6 sm:space-y-8">
          {#each sandwichMenu.sections as section}
            <section>
              {#if section.title}
                <div class="flex items-center gap-3 mb-3 pb-1 border-b border-sepia-400/40">
                  <svg class="w-5 h-5 text-sepia-800 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d={fleurDeLis} />
                  </svg>
                  <h2 class="text-xl sm:text-2xl font-bold tracking-[0.2em] text-sepia-900 uppercase">{section.title}</h2>
                </div>
              {/if}

              <div class="text-base sm:text-[17px] text-sepia-900 leading-relaxed font-normal">
                <div class="menu-item sizes text-xs sm:text-sm tracking-[0.15em] uppercase text-sepia-800">
                  <span class="grow" />
                  <span class="price-col">{translateOther("medium", language)}</span>
                  <span class="price-col">{translateOther("large", language)}</span>
                </div>

                {#each section.sandwiches as sandwich}
                  <div class="menu-item">
                    <span class="name">
                      {sandwich.name}
                      {#if sandwich.allergens}
                        {#each sandwich.allergens as allergen}
                          <img class="allergen" src="/img/allergens/{allergen}.jpg" alt={allergen} />
                        {/each}
                      {/if}
                    </span>
                    <span class="leader" />
                    <span class="price-col">{#if sandwich.price.medium}{sandwich.price.medium} €{/if}</span>
                    <span class="price-col">{sandwich.price.large} €</span>
                  </div>
                  {#if sandwich.description || sandwich.large_variant}
                    <div class="description flex justify-between gap-4">
                      <span>{#if sandwich.description}({sandwich.description}){/if}</span>
                      {#if sandwich.large_variant}
                        <span class="text-right shrink-0">({translateOther(sandwich.large_variant, language).toLowerCase()})</span>
                      {/if}
                    </div>
                  {/if}
                {/each}
              </div>
            </section>
          {/each}
        </div>

        <div class="flex justify-center items-center gap-2 mt-8 text-sepia-700/80">
          <span class="w-8 h-[1px] bg-sepia-600/50" />
          <span class="text-xs">♦</span>
          <span class="w-8 h-[1px] bg-sepia-600/50" />
        </div>

        <ul class="flex flex-wrap justify-center gap-x-5 gap-y-1 mt-4 text-sm sm:text-base">
          {#each legendAllergens as allergen}
            <li class="flex items-center">
              <img class="allergen" src="/img/allergens/{allergen}.jpg" alt={allergen} /><span class="ml-1.5">{translateAllergen(allergen, language)}</span>
            </li>
          {/each}
        </ul>

        <p class="mt-5 pt-3 border-t border-dotted border-sepia-600/60 text-center text-base sm:text-lg italic">{footer}</p>
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

  /* Sandwich names are long: unlike the coffee page, they may wrap */
  .menu-item .name {
    position: relative;
    z-index: 1;
    padding-right: 0.3rem;
  }

  .menu-item .leader {
    flex-grow: 1;
    min-width: 1rem;
    border-bottom: 1.5px dotted #785842;
    position: relative;
    bottom: 0.28em;
    margin: 0 0.2rem;
    opacity: 0.8;
  }

  /* The header row has no leader, so the size labels stay aligned with the prices */
  .menu-item.sizes {
    margin-bottom: 0.4rem;
  }

  .price-col {
    flex: none;
    width: 4.5rem;
    text-align: right;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }

  .allergen {
    display: inline-block;
    width: 1.1rem;
    height: 1.1rem;
    margin-left: 0.3rem;
    vertical-align: -0.15em;
  }

  .description {
    font-style: italic;
    font-size: 0.9em;
    line-height: 1.3;
    opacity: 0.8;
    margin-bottom: 0.45rem;
  }
</style>
