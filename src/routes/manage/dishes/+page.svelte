<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;
  import type { PersistentDish } from "$lib/types";

  import { Accordion, AccordionItem, AppBar, AppShell, SlideToggle } from "@skeletonlabs/skeleton";
  import Allergens from "$lib/components/allergens.svelte";

  let dishes: PersistentDish[] = data.dishes as PersistentDish[];
  let dirty = new Array(dishes.length);

  const setDirty = (index: number) => {
    dirty[index] = true;
  };

  const saveDish = async (index: number) => {
    const response = await fetch("/api/dishes", {
      method: "PUT",
      body: JSON.stringify({ data: dishes[index] }),
      headers: {
        "content-type": "application/json",
      },
    });

    dirty[index] = false;
  };

  const deleteDish = async (index: number) => {
    const response = await fetch("/api/dishes", {
      method: "DELETE",
      body: JSON.stringify({ data: dishes[index] }),
      headers: {
        "content-type": "application/json",
      },
    });

    dishes.splice(index, 1);
    dirty.splice(index, 1);
    dishes = dishes;
  };

  const addDish = () => {
    dishes.push({});
    dirty[dishes.length - 1] = true;
    dishes = dishes;
  };

  let filterValue: string;

  const onClickName = (event: any) => {
    event.stopPropagation();
  };
</script>

<AppShell>
  <svelte:fragment slot="header">
    <AppBar background="bg-yellow-500">
      <h2 class="h2">Dishes</h2>
      <svelte:fragment slot="trail">
        <input class="input p-1 w-40 font-sans" type="search" bind:value={filterValue} />
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>
  <div>
    {#each dishes as dish, index}
      {#if !filterValue || dish.name.toUpperCase().indexOf(filterValue.toUpperCase()) > -1}
        <div class="card m-4 relative">
          <Accordion>
            <AccordionItem>
              <svelte:fragment slot="summary">
                <header class="card-header h3">
                  <div contenteditable="true" bind:textContent={dish.name} on:keypress={() => setDirty(index)} on:click={onClickName} />
                </header>
              </svelte:fragment>
              <svelte:fragment slot="content">
                <section class="px-4 py-1 h4">
                  <div contenteditable="true" bind:textContent={dish.description} on:keypress={() => setDirty(index)} />
                </section>
                <section class="px-4 py-1 h4 flex flex-row space-x-1">
                  <div contenteditable="true" bind:textContent={dish.price} on:keypress={() => setDirty(index)} />
                  <div>€</div>
                </section>
                <section class="px-4 py-1 h4 flex items-center space-x-2">
                  <SlideToggle name="st_{index}" bind:checked={dish.vegetarian} on:change={() => setDirty(index)} size="sm" active="bg-green-700" />
                  <div>
                    {#if dish.vegetarian}
                      <span style="color: green; font-weight: bold;">Vegetarian </span>
                    {:else}
                      Non vegetarian
                    {/if}
                  </div>
                </section>
                <section class="px-4 py-1">
                  <div class="flex allergens">
                    {#if dish.allergens}
                      {#each dish.allergens as allergen}
                        <img src="/img/allergens/{allergen}.jpg" alt={allergen} />
                      {/each}
                    {/if}
                  </div>
                </section>
                <section class="px-4 py-1">
                  <Allergens bind:values={dish.allergens} on:toggle={() => setDirty(index)} />
                </section>
                {#if dirty[index]}
                  <footer class="card-footer">
                    <button class="btn variant-filled" on:click={() => saveDish(index)}>save</button>
                  </footer>
                {/if}
                <button class="btn btn-sm variant-filled-error absolute bottom-2 right-2" on:click={() => deleteDish(index)}>delete</button>
              </svelte:fragment>
            </AccordionItem>
          </Accordion>
        </div>
      {/if}
    {/each}
  </div>

  <button class="btn variant-filled fixed bottom-4 right-4" on:click={addDish}>Add</button>
</AppShell>

<style>
  :global(body) {
    margin: 10px;
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  }

  div {
  }

  .allergens img,
  .allergen-list img {
    width: 30px;
    margin-left: 5px;
    vertical-align: text-top;
  }
</style>
