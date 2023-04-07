<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;

  import { capitalize } from "$lib/capitalizer";
  import Allergens from "$lib/components/allergens.svelte";

  let menu = data;

  const addDish = (section: any) => {
    section.dishes.push({ name: "temporal", price: "0" });
    menu = menu;
  };
</script>

{#each menu.sections as section}
  <div class="section">
    <div class="title" contenteditable="true">{section.title}</div>
    {#each section.dishes as dish}
      <div class="dish">
        <div class="name" contenteditable="true" bind:innerHTML={dish.name} />
        <div
          class="vegetarian {dish.vegetarian ? 'true' : ''}"
          on:click={() => (dish.vegetarian = !dish.vegetarian)}
        >
          (v)
        </div>
        <Allergens />
        <div class="price" contenteditable="true" bind:innerHTML={dish.price} />
      </div>
    {/each}
    <button on:click={() => addDish(section)}>+ DISH</button>
  </div>
{/each}

<pre style="border: solid 1px red">
  {JSON.stringify(menu, null, 4)}
</pre>

<style>
  :global(body) {
    margin: 10px;
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
      sans-serif;
  }

  .section {
    margin-bottom: 20px;
  }

  .section .title {
    width: fit-content;
    font-size: 30px;
  }

  .dish {
    margin: 15px 0;
  }

  .dish .name {
    width: fit-content;
    font-size: 20px;
  }

  .dish .price::after {
    content: " €";
  }

  .vegetarian {
    margin-bottom: 5px;
    cursor: pointer;
  }

  .vegetarian.true {
    color: green;
    font-size: larger;
    font-weight: bold;
  }
</style>
