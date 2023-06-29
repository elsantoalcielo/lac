<script lang="ts">
  import Language from "$lib/components/language.svelte";
  import { translateAllergen } from "$lib/utils";
  import type { PageData } from "./$types";
  export let data: PageData;

  const { sandwichMenu, title, footer, language } = data;
</script>

<svelte:head>
  <title>L'Amagat Cafè - {title}</title>
</svelte:head>

<div class="m-auto max-w-[1024px] flex flex-col items-center font-['Montserrat'] font-bold">
  <div class="mt-2.5 cursor-pointer" on:click={() => (location.href = "/")}>
    <img class="w-52" src="/img/logo.png" alt="Logo" />
  </div>

  {#if sandwichMenu.title}
    <div>
      {sandwichMenu.title}
    </div>
  {/if}

  {#each sandwichMenu.sections as section}
    <div class="flex flex-col items-center mb-3 w-full">
      {#if section.title}
        <div class="mb-1 text-2xl border-dotted border-black border-b-[1px] text-center">{section.title}</div>
      {/if}
      <div class="w-[90%]">
        <div class="flex mt-1.5">
          <div class="basis-1/2" />
          <div class="basis-1/4 text-right">MITJÀ</div>
          <div class="basis-1/4 text-right">GRAN</div>
        </div>
        {#each section.sandwiches as sandwich}
          <div class="flex mt-1.5">
            <div class="flex basis-1/2 items-center">
              <div class="text-lg">
                {sandwich.name}
              </div>
              <div class="flex items-center">
                {#if sandwich.allergens}
                  {#each sandwich.allergens as allergen}
                    <img class="w-5 h-5 ml-1.5" src="/img/allergens/{allergen}.jpg" alt={allergen} />
                  {/each}
                {/if}
              </div>
            </div>
            <div class="basis-1/4 text-xl flex items-center justify-end">
              {#if sandwich.price.medium}
                {sandwich.price.medium} €
              {/if}
            </div>
            <div class="flex flex-wrap basis-1/4 items-center justify-end text-xl">
              {#if sandwich.large_variant}
                <div class="text-sm md:mr-2">{sandwich.large_variant}</div>
              {/if}
              <div>{sandwich.price.large} €</div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/each}

  <div class="w-[100px] h-[25px] bg-center bg-contain bg-no-repeat" style="background-image: url(/img/filigrana.png)" />

  <div class="flex justify-center font-['Lora'] font-bold mt-4">
    <div class="flex">
      <img class="w-5 h-5 ml-1.5" src="/img/allergens/gluten.jpg" alt="gluten" /><span class="ml-1.5 mr-3">{translateAllergen("gluten", language)}</span>
    </div>
    <div class="flex">
      <img class="w-5 h-5 ml-1.5" src="/img/allergens/eggs.jpg" alt="eggs" /><span class="ml-1.5 mr-3">{translateAllergen("eggs", language)}</span>
    </div>
    <div class="flex">
      <img class="w-5 h-5 ml-1.5" src="/img/allergens/fish.jpg" alt="fish" /><span class="ml-1.5 mr-3">{translateAllergen("fish", language)}</span>
    </div>
    <div class="flex">
      <img class="w-5 h-5 ml-1.5" src="/img/allergens/milk.jpg" alt="milk" /><span class="ml-1.5 mr-3">{translateAllergen("milk", language)}</span>
    </div>
  </div>

  <div class="mt-5 pt-2.5 border-dotted border-t-[1px] border-t-black max-w-[90%] text-center text-xl">{footer}</div>

  <div class="absolute right-1 top-1">
    <Language language={data.language} />
  </div>
</div>

<style>
  @import url(../../../static/fonts/fonts.css);
</style>
