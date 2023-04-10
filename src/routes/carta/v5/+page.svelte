<script lang="ts">
  import type { PageData } from "../$types";
  export let data: PageData;

  let menu = data;
  menu.title = "CARTA de la SETMANA";
</script>

<div class="menu">
  <div class="logo">
    <!--    <img src="/img/logo.png" alt="Logo" /> -->

    {#if menu.title}
      <div class="title">
        {menu.title}
      </div>
    {/if}
  </div>

  {#each menu.sections as section}
    <div class="section">
      {#if section.title}
        <div class="title">{section.title}</div>
      {/if}
      {#each section.dishes as dish}
        <div class="dish">
          <div class="name">
            {#if dish.featured}
              <span class="featured">
                <img src="/img/star.svg" alt="featured" />
              </span>
            {/if}
            {dish.name}
            <span class="vegetarian">
              {#if dish.vegetarian}
                <img src="/img/vegetarian.png" alt="vegetarian" title="vegetarian" />
              {/if}
            </span>
          </div>
          <div class="allergens">
            {#if dish.allergens}
              {#each dish.allergens as allergen}
                <img src="/img/allergens/{allergen.name}.jpg" alt={allergen.name} title={allergen.name} />
              {/each}
            {/if}
          </div>
          <div class="price">{dish.price} €</div>
          {#if dish.description}
            <div class="description">{dish.description}</div>
          {/if}
        </div>
      {/each}
      <div class="filigrana" />
    </div>
  {/each}

  <div class="allergen-list">
    <div>
      <img src="/img/allergens/gluten.jpg" alt="gluten" /><span>Gluten</span>
    </div>
    <div>
      <img src="/img/allergens/crustaceans.jpg" alt="crustaceans" /><span>Crustacis</span>
    </div>
    <div><img src="/img/allergens/eggs.jpg" alt="eggs" /><span>Ous</span></div>
    <div><img src="/img/allergens/fish.jpg" alt="fish" /><span>Peix</span></div>
    <div>
      <img src="/img/allergens/peanuts.jpg" alt="peanuts" /><span>Cacauet</span>
    </div>
    <div>
      <img src="/img/allergens/soybeans.jpg" alt="soybeans" /><span>Soja</span>
    </div>
    <div>
      <img src="/img/allergens/milk.jpg" alt="milk" /><span>Làctics</span>
    </div>
    <div>
      <img src="/img/allergens/nuts.jpg" alt="nuts" /><span>Fruits secs</span>
    </div>
    <div>
      <img src="/img/allergens/celery.jpg" alt="celery" /><span>Api</span>
    </div>
    <div>
      <img src="/img/allergens/mustard.jpg" alt="mustard" /><span>Mostassa</span>
    </div>
    <div>
      <img src="/img/allergens/sesame.jpg" alt="sesame" /><span>Llavors de sèsam</span>
    </div>
    <div>
      <img src="/img/allergens/sulphites.jpg" alt="sulphites" /><span>Sulfits</span>
    </div>
    <div>
      <img src="/img/allergens/lupin.jpg" alt="lupin" /><span>Tramussos</span>
    </div>
    <div>
      <img src="/img/allergens/molluscs.jpg" alt="molluscs" /><span>Mol·luscs</span>
    </div>
  </div>

  <div class="footer">Tots els preus inclouen l'IVA. Si teniu alguna AL·LÈRGIA o INTOLERÀNCIA, consulteu-nos, si us plau</div>
</div>

<style>
  @import url(../../../css/reset.css);
  @import url(../../../../static/fonts/fonts.css);

  .menu {
    font-size: 20px;
    margin: 20px auto;
    max-width: 1200px;
    background-color: #bed0d8;
    color: #7c4a0c;
  }

  .logo {
    padding-bottom: 10px;
  }

  .logo img {
    width: 100px;
  }

  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .logo .title {
    font-family: "Abril Fatface";
    font-size: 50px;
  }

  .section {
    text-align: center;
    margin-top: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
  }

  .section .title {
    font-family: "Abril Fatface";
    font-size: xx-large;
    font-style: italic;
    text-transform: uppercase;
    margin: 20px 0;
  }

  .section .title::before {
    content: "- ";
  }

  .section .title::after {
    content: " -";
  }

  .dish {
    margin-bottom: 10px;
    font-family: "AbeeZee";
  }

  .dish .price {
    font-size: larger;
  }

  .vegetarian img {
    width: 20px;
    margin-left: 5px;
  }

  .featured img {
    width: 20px;
    margin-bottom: 2px;
  }

  .allergens img,
  .allergen-list img {
    width: 20px;
    margin-left: 5px;
    vertical-align: text-top;
  }

  .allergen-list {
    font-family: "Alegreya";
    font-size: smaller;
  }

  .allergen-list {
    margin-top: 20px;
  }

  .allergen-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
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
</style>
