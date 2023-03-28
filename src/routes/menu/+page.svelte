<script>
  import { capitalize } from "../../lib/capitalizer";

  let menu = {
    title: undefined,
    sections: [
      {
        title: undefined,
        dishes: [
          {
            name: "Enciams amb formatge de cabra, mel i cacahuets",
            description: undefined,
            price: "4,95",
            vegetarian: true,
            allergens: [
              {
                name: "milk",
              },
              {
                name: "nuts",
              },
            ],
          },
          {
            name: "Amanida de tomàquet amb bonítol escabetxat aquí",
            description: undefined,
            price: "5.50",
            allergens: [
              {
                name: "fish",
              },
            ],
          },
          {
            name: "Burrata amb tomàquet",
            price: "6",
            vegetarian: true,
            allergens: [
              {
                name: "milk",
              },
            ],
          },
          {
            name: "Coca amb escalibada i sardines marinades aquí",
            price: "5,65",
            allergens: [
              {
                name: "gluten",
              },
              {
                name: "milk",
              },
              {
                name: "fish",
              },
            ],
          },
        ],
      },
      {
        title: undefined,
        dishes: [
          {
            name: "Sopa de ceba amb galeta de formatge",
            description: undefined,
            price: "4,65",
            vegetarian: true,
            allergens: [
              {
                name: "gluten",
              },
              {
                name: "milk",
              },
            ],
          },
          {
            name: "Crema de carbassa amb toc de vainilla",
            description: undefined,
            price: "4,65",
            vegetarian: true,
          },
          {
            name: "Timbal de verdures amb pernil ibèric",
            price: "5,75",
          },
          {
            name: "Pasta amb salsa de formatges o pesto vermell",
            price: "5",
            vegetarian: true,
            allergens: [
              {
                name: "gluten",
              },
              {
                name: "milk",
              },
              {
                name: "nuts",
              },
            ],
          },
          {
            name: "Avui també arròs de galta de porc",
            price: "6,95",
          },
        ],
      },
      {
        title: undefined,
        dishes: [
          {
            name: "Mandonguilles fetes aquí amb sípia",
            price: "10",
            allergens: [
              {
                name: "milk",
              },
            ],
          },
          {
            name: "Tataki de tonyina amb verdures",
            price: "11",
            allergens: [
              {
                name: "fish",
              },
            ],
          },
          {
            name: "Secret de porc amb patata i verdures",
            price: "12",
          },
          {
            name: "Peix del dia",
            price: "13",
          },
          {
            name: "Bistec de vedella de Girona amb patata i verdura",
            price: "14",
          },
        ],
      },
    ],
  };
</script>

<div class="menu">
  <div class="logo">
    <img src="/img/logo.png" alt="Logo" />
  </div>

  {#if menu.title}
    <div class="title">
      {menu.title}
    </div>
  {/if}

  {#each menu.sections as section}
    <div class="section">
      {#if section.title}
        <div class="title">{section.title}</div>
      {/if}
      {#each section.dishes as dish}
        <div class="dish">
          <div class="details">
            <div class="name">{capitalize(dish.name)}</div>
            {#if dish.vegetarian}
              <div class="vegetarian">(v)</div>
            {/if}
            {#if dish.allergens}
              <div class="allergens">
                {#each dish.allergens as allergen}
                  <img
                    src="/img/allergens/{allergen.name}.jpg"
                    alt={allergen.name}
                  />
                {/each}
              </div>
            {/if}
            <div class="price">{dish.price} €</div>
          </div>
          {#if dish.description}
            <div class="description">{dish.description}</div>
          {/if}
        </div>
      {/each}
      <div class="filigrana" />
    </div>
  {/each}

  <div class="allergens">
    <div>
      <img src="/img/allergens/gluten.jpg" alt="gluten" /><span>Gluten</span>
    </div>
    <div>
      <img src="/img/allergens/crustaceans.jpg" alt="crustaceans" /><span
        >Crustacis</span
      >
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
      <img src="/img/allergens/mustard.jpg" alt="mustard" /><span>Mostassa</span
      >
    </div>
    <div>
      <img src="/img/allergens/sesame.jpg" alt="sesame" /><span
        >Llavors de sèsam</span
      >
    </div>
    <div>
      <img src="/img/allergens/sulphites.jpg" alt="sulphites" /><span
        >Sulfits</span
      >
    </div>
    <div>
      <img src="/img/allergens/lupin.jpg" alt="lupin" /><span>Tramussos</span>
    </div>
    <div>
      <img src="/img/allergens/molluscs.jpg" alt="molluscs" /><span
        >Mol·luscs</span
      >
    </div>
  </div>

  <div class="footer">
    Tots els preus inclouen l'IVA. Si teniu alguna AL·LÈRGIA o INTOLERÀNCIA,
    consulteu-nos, si us plau
  </div>
</div>

<style>
  @import url(../../css/reset.css);
  @import url(../../../static/fonts/fonts.css);

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
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .dish .details {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .dish .name {
    font-size: large;
  }

  .dish .vegetarian {
    color: green;
    font-weight: bold;
    font-style: italic;
    margin-left: 10px;
  }

  .dish .price {
    margin-left: 10px;
  }

  .dish .description {
    font-style: italic;
  }

  .allergens {
    display: flex;
    font-family: Lora;
    font-size: smaller;
    max-width: 80%;
    flex-wrap: wrap;
    justify-content: center;
  }

  .allergens img {
    width: 20px;
    margin-left: 5px;
    vertical-align: text-top;
  }

  .allergens span {
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
</style>
