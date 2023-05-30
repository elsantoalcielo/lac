<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;
  import { signOut } from "@auth/sveltekit/client";

  import Allergens from "$lib/components/allergens.svelte";
  import Translations from "$lib/components/translations.svelte";
  import type { Dish, Menu } from "$lib/types";

  let dishes: Dish[] = data.dishes as Dish[];
</script>

<div class="list">
  {#each dishes as dish}
    <div class="dish">
      {dish.name}
    </div>
  {/each}
</div>

<style>

  .list {
    margin: 10px;
  }

  .dish {
    margin-bottom: 10px;
  }

</style>