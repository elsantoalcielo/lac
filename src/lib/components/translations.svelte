<script lang="ts">
  export let translations: DishTranslations = {};

  const add = () => {
    translations[newLanguage] = {
      name: "translated name",
      description: "translated description",
    };
  };

  let open = false;
  let newLanguage: string;
</script>

<div class="translations">
  <button on:click={() => (open = !open)}> #%& </button>
  {#if open}
    <div class="list">
      {#each Object.entries(translations) as [language, translation]}
        <div class="translation">
          <div class="language">{language}</div>
          <div class="name" contenteditable="true" bind:textContent={translation.name} />
          <div class="description" contenteditable="true" bind:textContent={translation.description} />
        </div>
      {/each}
      {#if translations.tmp == undefined}
        <input bind:value={newLanguage} />
        <button on:click={add} disabled={!newLanguage || newLanguage.length == 0}>+</button>
      {/if}
    </div>
  {/if}
</div>

<style>
  .translations button {
    padding: 0px 5px;
  }

  .list {
    border: solid 1px gray;
    margin-top: 5px;
    padding: 5px;
  }

  .translation {
    margin-bottom: 5px;
  }

  .name,
  .description {
    margin-left: 5px;
    width: fit-content;
  }
</style>
