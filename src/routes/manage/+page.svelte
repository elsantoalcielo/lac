<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;
  import { signOut } from "@auth/sveltekit/client";

  import Allergens from "$lib/components/allergens-old.svelte";
  import Translations from "$lib/components/translations.svelte";
  import type { Dish, Menu } from "$lib/types";

  import { Autocomplete, popup } from "@skeletonlabs/skeleton";
  import type { AutocompleteOption, PopupSettings } from "@skeletonlabs/skeleton";

  import { LANGUAGES } from "$lib/languages";

  let menu: Menu = data.menu as Menu;
  let dishes = data.dishes;

  const addDish = (section: any) => {
    section.dishes.push({ name: "", price: "" });
    menu = menu;
  };

  const upDish = (section: any, index: number) => {
    if (index > 0) {
      let temporal = section.dishes[index - 1];
      section.dishes[index - 1] = section.dishes[index];
      section.dishes[index] = temporal;
      menu = menu;
    }
  };

  const downDish = (section: any, index: number) => {
    if (index < section.dishes.length - 1) {
      let temporal = section.dishes[index + 1];
      section.dishes[index + 1] = section.dishes[index];
      section.dishes[index] = temporal;
      menu = menu;
    }
  };

  const deleteDish = (section: any, index: number) => {
    section.dishes.splice(index, 1);
    menu = menu;
  };

  const updateDish = async (dish: Dish) => {
    const response = await fetch("/api/dishes", {
      method: "PUT",
      body: JSON.stringify({ data: dish }),
      headers: {
        "content-type": "application/json",
      },
    });
  };

  const save = async () => {
    const response = await fetch("/api/current-menu", {
      method: "PUT",
      body: JSON.stringify({ data: menu }),
      headers: {
        "content-type": "application/json",
      },
    });
  };

  const dishOptions: AutocompleteOption[] = dishes.map((dish: Dish): AutocompleteOption => {
    return { label: dish.name, value: dish };
  });

  let popupSettings: PopupSettings = {
    event: "focus-click",
    target: "popupAutocomplete",
    placement: "bottom",
  };

  let selectedDish = new Array(menu?.sections.length);
  selectedDish.fill("");

  const onDishSelected = (event: any, section: any) => {
    section.dishes.push(event.detail.value);
    menu = menu;
  };
</script>

<div class="buttons">
  <button on:click={save}>SAVE</button>
  <button on:click={signOut}>log out</button>
</div>

{#each menu.sections as section, index}
  <div class="section">
    <div class="title" contenteditable="true" bind:textContent={section.title} />
    {#each section.dishes as dish, index}
      <div class="dish">
        <div class="index">{index + 1}.</div>
        <div class="name" contenteditable="true" bind:textContent={dish.name} />
        <button class="up" on:click={() => upDish(section, index)}>^</button>
        <button class="down" on:click={() => downDish(section, index)}>v</button>
        <button class="delete" on:click={() => deleteDish(section, index)}>x</button>
        <button class="update" on:click={() => updateDish(dish)}>update</button>
        {#if dish._id == undefined}
          <span class="no_id">NO ID!!</span>
        {/if}
        <div class="description" contenteditable="true" bind:textContent={dish.description} />
        <div class="price" contenteditable="true" bind:textContent={dish.price} />
        <div class="vegetarian {dish.vegetarian ? 'true' : ''}" on:click={() => (dish.vegetarian = !dish.vegetarian)}>(v)</div>
        <Allergens bind:values={dish.allergens} />
        <div class="featured {dish.featured ? 'true' : ''}" on:click={() => (dish.featured = !dish.featured)}>&#9733;</div>
        <Translations bind:translations={dish.translations} />
        {#each LANGUAGES as language}
          {#if dish.translations && dish.translations[language.locale] == undefined && language.locale != "ca"}
            <div class="missing">{language.locale}</div>
          {/if}
        {/each}
      </div>
    {/each}
    <button on:click={() => addDish(section)}>+ DISH</button>

    <input
      class="input"
      type="search"
      bind:value={selectedDish[index]}
      placeholder="Search..."
      use:popup={{ ...popupSettings, target: `popupAutocomplete_${index}` }}
    />
    <div class="card w-full max-h-48 p-4 overflow-y-auto" data-popup="popupAutocomplete_{index}">
      <Autocomplete bind:input={selectedDish[index]} options={dishOptions} on:selection={(event) => onDishSelected(event, section)} />
    </div>
  </div>
{/each}

<pre style="border: solid 1px red">
  {JSON.stringify(menu, null, 4)}
</pre>

<style>
  :global(body) {
    margin: 10px;
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  }

  .buttons {
    position: fixed;
    right: 10px;
  }

  .buttons button {
    margin-left: 20px;
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
    margin-left: 25px;
  }

  .dish .index {
    position: absolute;
    margin-left: -25px;
    margin-top: 5px;
    font-size: smaller;
  }

  .dish .name {
    width: fit-content;
    font-size: 20px;
    display: inline;
  }

  .dish .name:empty::before {
    content: "nom del plat";
    color: gray;
  }

  .dish .description {
    width: fit-content;
    min-width: 20px;
  }

  .dish .price:empty::before {
    content: "preu";
    color: gray;
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

  .featured {
    width: fit-content;
    margin-top: 5px;
    color: gray;
    cursor: pointer;
  }

  .featured.true {
    color: yellow;
    background-color: black;
  }

  button.up,
  button.down {
    margin-left: 20px;
    font-weight: bold;
  }

  button.delete {
    margin-left: 20px;
    color: red;
    font-weight: bold;
  }

  button.update {
    margin-left: 20px;
    font-weight: bold;
  }

  .missing {
    border-radius: 10px 10px;
    background-color: red;
    padding: 2px;
    width: 25px;
    text-align: center;
    color: white;
    font-weight: bold;
  }

  .no_id {
    font-weight: bold;
    color: red;
    margin-left: 20px;
    text-decoration: underline;
  }
</style>
