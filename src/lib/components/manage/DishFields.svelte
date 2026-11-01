<script lang="ts">
  import { SlideToggle } from "@skeletonlabs/skeleton";
  import PriceInput from "./PriceInput.svelte";
  import AllergenPicker from "./AllergenPicker.svelte";
  import TranslationsEditor from "./TranslationsEditor.svelte";

  type DishRow = {
    name: string;
    price: string;
    description?: string;
    vegetarian?: boolean;
    featured?: boolean;
    allergens?: string[];
    translations?: { [language: string]: { [field: string]: string } };
  };

  let { dish = $bindable(), idPrefix }: { dish: DishRow; idPrefix: string } = $props();

  const optionsCount = $derived((dish.vegetarian ? 1 : 0) + (dish.featured ? 1 : 0) + (dish.allergens?.length ?? 0));
</script>

<div class="grid gap-3 sm:grid-cols-[1fr_8rem]">
  <label class="block">
    <span class="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sepia-600">
      Nom
      {#if !dish.name.trim()}<span class="rounded-full bg-amber-200 px-2 py-0.5 text-[10px] normal-case tracking-normal text-amber-900">Falta</span>{/if}
    </span>
    <input
      class="w-full rounded-md border bg-white px-3 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-sepia-400 {dish.name.trim() ? 'border-sepia-400/50' : 'border-amber-400'}"
      bind:value={dish.name}
    />
  </label>
  <PriceInput bind:value={dish.price} currency={false} />
  <label class="block sm:col-span-2">
    <span class="mb-1 block text-xs font-semibold uppercase tracking-wider text-sepia-600">Descripció</span>
    <input class="w-full rounded-md border border-sepia-400/50 bg-white px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-sepia-400" bind:value={dish.description} />
  </label>
</div>

<details class="group mt-2">
  <summary class="flex cursor-pointer list-none items-center gap-2 text-sm text-sepia-700 hover:text-sepia-900">
    <svg class="h-4 w-4 transition-transform group-open:rotate-90" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M7 4l6 6-6 6V4z" /></svg>
    Al·lèrgens i opcions
    {#if optionsCount > 0}<span class="rounded-full bg-sepia-200/60 px-2 py-0.5 text-xs text-sepia-800">{optionsCount}</span>{/if}
  </summary>
  <div class="mt-3 space-y-3">
    <div class="flex flex-wrap gap-x-6 gap-y-2">
      <label class="flex items-center gap-2 text-sm">
        <SlideToggle name="{idPrefix}-vegetarian" bind:checked={dish.vegetarian} size="sm" active="bg-green-700" />
        Vegetarià
      </label>
      <label class="flex items-center gap-2 text-sm">
        <SlideToggle name="{idPrefix}-featured" bind:checked={dish.featured} size="sm" active="bg-amber-600" />
        Destacat
      </label>
    </div>
    <AllergenPicker bind:values={dish.allergens} />
  </div>
</details>

<TranslationsEditor
  bind:translations={dish.translations}
  fields={[
    { key: "name", label: "Nom" },
    { key: "description", label: "Descripció" },
  ]}
/>
