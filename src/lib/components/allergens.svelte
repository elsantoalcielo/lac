<script>
  const allergensList = [
    "Gluten",
    "Crustacis",
    "Ous",
    "Peix",
    "Cacauet",
    "Soja",
    "Làctics",
    "Fruits secs",
    "Api",
    "Mostassa",
    "Llavors de sèsam",
    "Sulfits",
    "Tramussos",
    "Mol·luscs",
  ];

  let values = new Array(allergensList.length);

  let open = false;
</script>

<div>
  <button on:click={() => (open = !open)}>!</button>
  {#if open}
    <div>
      {#each allergensList as allergen, index}
        <div>
          <label>
            <input type="checkbox" bind:checked={values[index]} />{allergen}
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
