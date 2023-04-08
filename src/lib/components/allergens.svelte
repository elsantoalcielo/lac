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

  let open = false;

  const changed = (e: Event & { currentTarget: EventTarget & HTMLInputElement }, allergen: string) => {
    const index = values.indexOf(allergen);
    if ((e.target as HTMLInputElement).checked) {
      if (index == -1) {
        values.push(allergen);
      }
    } else {
      if (index > -1) {
        values.splice(index, 1);
      }
    }
    console.log("LFV " + JSON.stringify(values))
  };
</script>

<div>
  <button on:click={() => (open = !open)}>!</button>
  {#if open}
    <div>
      {#each allergensList as allergen, index}
        <div>
          <label>
            <input type="checkbox" checked={values.indexOf(allergen) > -1} on:input={(e) => changed(e, allergen)} />{allergen}
          </label>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  button {
    border: solid 1px black;
    border-radius: 5px;
  }

  img {
    width: 20px;
  }
</style>
