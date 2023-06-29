<script lang="ts">
  import Language from "$lib/components/language.svelte";
  import { translateAllergen } from "$lib/utils";
  import type { PageData } from "./$types";
  export let data: PageData;

  const { sandwichMenu, title, footer, language } = data;
</script>

<svelte:head>
  <title>L'Amagat Cafè - {title}</title>
</svelte:head>
<div class="menu">
  <div class="logo" on:click={() => location.href = '/'}>
    <img src="/img/logo.png" alt="Logo" />
  </div>

  {#if sandwichMenu.title}
    <div class="title">
      {sandwichMenu.title}
    </div>
  {/if}

  {#each sandwichMenu.sections as section}
    <div class="section">
      {#if section.title}
        <div class="title">{section.title}</div>
      {/if}
      {#each section.sandwiches as sandwich}
        <div class="dish">
          <div class="name">
            {sandwich.name}
          </div>
          <div class="allergens">
            {#if sandwich.allergens}
              {#each sandwich.allergens as allergen}
                <img src="/img/allergens/{allergen}.jpg" alt={allergen} />
              {/each}
            {/if}
          </div>
          <div class="price">{sandwich.price} €</div>
          <!--
          {#if dish.description}
            <div class="description">{dish.description}</div>
          {/if}
          -->
        </div>
      {/each}
      <div class="filigrana" />
    </div>
  {/each}

  <div class="allergen-list">
    <div>
      <img src="/img/allergens/gluten.jpg" alt="gluten" /><span>{translateAllergen("gluten", language)}</span>
    </div>
    <div><img src="/img/allergens/eggs.jpg" alt="eggs" /><span>{translateAllergen("eggs", language)}</span></div>
    <div><img src="/img/allergens/fish.jpg" alt="fish" /><span>{translateAllergen("fish", language)}</span></div>
    <div>
      <img src="/img/allergens/milk.jpg" alt="milk" /><span>{translateAllergen("milk", language)}</span>
    </div>
  </div>

  <div class="footer">{footer}</div>

  <div class="language">
    <Language language={data.language} />
  </div>
</div>

<style>
  @import url(../../css/reset.css);
  @import url(../../../static/fonts/fonts.css);

  .language {
    position: absolute;
    right: 5px;
    top: 5px;
  }

  .logo {
    margin-top: 10px;
    cursor: pointer;
  }

  .logo img {
    width: 200px;
  }

  .menu {
    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: white;
    color: black;
    font-family: Montserrat;
    font-size: 20px;
    font-weight: bold;
  }

  .menu > .title {
    font-size: xx-large;
  }

  .section {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
  }

  .section > .title {
    font-size: x-large;
  }

  .dish {
    margin: 10px 0 0 0;
  }

  @media (max-width: 768px) {
    .dish {
      display: grid;
      grid-template-columns: auto auto;
      width: 90%;
      border-bottom: dotted 1px gray;
      padding-bottom: 10px;
    }

    .dish:nth-last-child(2) {
      border-bottom: none;
    }

    .dish .name {
      grid-column: 1 / 3;
    }

    .dish .price {
      text-align: right;
    }

    .allergen-list {
      display: flex;
      max-width: 90%;
      flex-wrap: wrap;
      justify-content: center;
    }
  }

  @media (min-width: 768px) {
    .dish {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .dish .price {
      margin-left: 10px;
    }

    .allergen-list {
      display: flex;
      max-width: 80%;
      flex-wrap: wrap;
      justify-content: center;
    }
  }

  .dish .name {
    font-size: large;
    text-align: left;
  }

  .dish .description {
    font-style: italic;
  }

  .allergens {
    display: flex;
  }

  .allergens img,
  .allergen-list img {
    width: 20px;
    margin-left: 5px;
    vertical-align: text-top;
  }

  .allergen-list {
    font-family: Lora;
    font-size: smaller;
  }

  .allergen-list div {
    display: flex;
  }

  .allergen-list span {
    margin-left: 5px;
    margin-right: 10px;
  }

  .footer {
    margin-top: 20px;
    padding-top: 10px;
    border-top: dotted 1px black;
    text-align: center;
  }

  .filigrana {
    background-image: url(/img/filigrana.png);
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    width: 100px;
    height: 25px;
    margin-top: 10px;
  }

  /* printing */

  @page {
    size: A4 landscape;
  }

  @media print {
    .language {
      display: none;
    }

    .footer {
      font-size: smaller;
    }

    .filigrana {
      -webkit-print-color-adjust: exact !important;
    }
  }
</style>
