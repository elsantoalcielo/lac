<script lang="ts">
  const allergensList = [
    "gluten",
    "crustaceans",
    "eggs",
    "fish",
    "peanuts",
    "soybeans",
    "milk",
    "nuts",
    "celery",
    "mustard",
    "sesame",
    "sulphites",
    "lupin",
    "molluscs",
  ];

  export let values: string[] = [];

  const toggle = (allergen: string) => {
    const index = values.indexOf(allergen);
    if (index == -1) {
      values.push(allergen);
    } else {
      values.splice(index, 1);
    }
    values = values;
  };
</script>

<div class="flex h-7 space-x-2 cursor-pointer">
  {#each allergensList as allergen}
    <img src="/img/allergens/{allergen}.jpg" alt={allergen} class:grayscale={values.indexOf(allergen) == -1} on:click={() => toggle(allergen)} />
  {/each}
</div>
