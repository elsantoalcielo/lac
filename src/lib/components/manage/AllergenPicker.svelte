<script lang="ts">
  import { translateAllergen } from "$lib/utils";

  const ALLERGENS = ["gluten", "crustaceans", "eggs", "fish", "peanuts", "soybeans", "milk", "nuts", "celery", "mustard", "sesame", "sulphites", "lupin", "molluscs"];

  let { values = $bindable() }: { values: string[] | undefined } = $props();

  const toggle = (allergen: string) => {
    const current = values ?? [];
    values = current.includes(allergen) ? current.filter((other) => other != allergen) : [...current, allergen];
  };
</script>

<div class="flex flex-wrap gap-2">
  {#each ALLERGENS as allergen}
    {@const active = values?.includes(allergen) ?? false}
    <button
      type="button"
      class="flex items-center gap-2 rounded-full border py-1 pl-1 pr-3 text-sm {active ? 'border-sepia-700 bg-sepia-200/60 font-semibold' : 'border-sepia-400/40 bg-white/60 text-sepia-700'}"
      aria-pressed={active}
      onclick={() => toggle(allergen)}
    >
      <img class="h-6 w-6 rounded-full {active ? '' : 'grayscale opacity-60'}" src="/img/allergens/{allergen}.jpg" alt="" />
      {translateAllergen(allergen, "ca")}
    </button>
  {/each}
</div>
