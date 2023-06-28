<script lang="ts">
  import { LANGUAGES } from "$lib/languages";

  export let language: string;

  const onChange = (event: any) => {
    location.replace(`${location.pathname}?l=${event.target.value}`);
  };
</script>

<select bind:value={language} on:change={onChange}>
  {#each LANGUAGES as language}
    <option value={language.locale}>{language.name}</option>
  {/each}
</select>
