<script lang="ts">
  import Language from "$lib/components/language.svelte";
  import { translateAllergen, translateOther } from "$lib/utils";
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
        <div class="flex items-center">
          <div><img src="/img/filigrana_s.svg" class="h-5 mr-3" alt="decoration" /></div>
          <div class="mb-1 text-2xl text-center">{section.title}</div>
          <div><img src="/img/filigrana_s.svg" class="h-5 ml-3" alt="decoration" /></div>
        </div>
      {/if}
      <div class="w-[90%]">
        <div class="flex mt-1.5">
          <div class="basis-3/5" />
          <div class="basis-1/5 text-right uppercase">{translateOther("medium", language)}</div>
          <div class="basis-1/5 text-right uppercase">{translateOther("large", language)}</div>
        </div>
        {#each section.sandwiches as sandwich}
          <div class="flex mt-1.5">
            <div class="flex basis-3/5 items-center">
              <div class="flex items-center md:text-lg">
                {sandwich.name}
                {#if sandwich.allergens}
                  {#each sandwich.allergens as allergen}
                    <img class="w-5 h-5 ml-1.5" src="/img/allergens/{allergen}.jpg" alt={allergen} />
                  {/each}
                {/if}
              </div>
            </div>
            <div class="basis-1/5 flex items-center justify-end md:text-lg">
              {#if sandwich.price.medium}
                {sandwich.price.medium} €
              {/if}
            </div>
            <div class="basis-1/5 flex items-center justify-end md:text-lg">
              <div>{sandwich.price.large} €</div>
            </div>
          </div>
          {#if sandwich.description || sandwich.large_variant}
            <div class="flex mt-[-5px]">
              <div class="basis-3/5 ml-2 text-sm md:text-base font-['Lora']">
                {#if sandwich.description}
                  ({sandwich.description})
                {/if}
              </div>
              <div class="basis-1/5" />
              {#if sandwich.large_variant}
                <div class="basis-1/5 font-['Lora'] text-sm text-right">({translateOther(sandwich.large_variant, language).toLowerCase()})</div>
              {/if}
            </div>
          {/if}
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
