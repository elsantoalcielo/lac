<div class="flex items-center justify-center h-screen">


<div class="menu">

  <div class="flex justify-between w-full px-10" style="position: absolute; top: 2rem">
  <div style="width: 8rem">
      <img src="/img/nadal-tl.png" alt="" />
  </div>
  <div style="width: 8rem">
      <img src="/img/nadal-tr.png" alt="" />
  </div>
  </div>


  <div class="logo">
    <a href="/">
      <img src="/img/logo-n.png" alt="Logo" />
    </a>
  </div>

  <div class="title mt-10">AQUESTS NADALS...</div>
  <div class="title mt-3 mb-10">CANELONS DE L'AMAGAT CAFÈ</div>

  <div class="section">

    <div class="dish">
      <div class="name">CANELONS TRADICIONALS de ROSTIT</div>
      <div class="allergens">
        <img src="/img/allergens/milk.jpg" alt="llet" />
        <img src="/img/allergens/gluten.jpg" alt="gluten" />
      </div>
      <div class="price">7 €</div>
    </div>

    <div class="dish">
      <div class="name">
        CANELONS de BACALLÀ i GAMBES amb BEIXAMEL de MARISC
      </div>
      <div class="allergens">
        <img src="/img/allergens/milk.jpg" alt="llet" />
        <img src="/img/allergens/gluten.jpg" alt="gluten" />
        <img src="/img/allergens/fish.jpg" alt="peix" />
        <img src="/img/allergens/crustaceans.jpg" alt="marisc" />
      </div>
      <div class="price">9 €</div>
    </div>

    <div class="dish">
      <div class="name">CANELONS de GALTA de PORC i POMA</div>
      <div class="allergens">
        <img src="/img/allergens/milk.jpg" alt="llet" />
        <img src="/img/allergens/gluten.jpg" alt="gluten" />
      </div>
      <div class="price">8 €</div>
    </div>
  </div>

  <div class="title mt-10" style="font-size: 1.5rem">ENCÀRRECS FINS EL 20/12/2025</div>
  <div class="title mt-2" style="font-size: 1.3rem">RECOLLIDA EL 24 ABANS DE LES 12:00</div>

  <div class="allergen-list mt-10">
    <div>
      <img src="/img/allergens/gluten.jpg" alt="gluten" /><span>gluten</span>
    </div>
    <div>
      <img src="/img/allergens/crustaceans.jpg" alt="crustaceans" /><span>marisc</span>
    </div>
    <!-- <div><img src="/img/allergens/eggs.jpg" alt="eggs" /><span>eggs</div> -->
    <div><img src="/img/allergens/fish.jpg" alt="fish" /><span>peix</div>
    <!-- <div>
      <img src="/img/allergens/peanuts.jpg" alt="peanuts" /><span>peanuts</span>
    </div> -->
    <!-- <div>
      <img src="/img/allergens/soybeans.jpg" alt="soybeans" /><span>soybeans</span>
    </div> -->
    <div>
      <img src="/img/allergens/milk.jpg" alt="milk" /><span>llet</span>
    </div>
    <!-- <div>
      <img src="/img/allergens/nuts.jpg" alt="nuts" /><span>nuts</span>
    </div>
    <div>
      <img src="/img/allergens/celery.jpg" alt="celery" /><span>celery</span>
    </div>
    <div>
      <img src="/img/allergens/mustard.jpg" alt="mustard" /><span>mustard</span>
    </div>
    <div>
      <img src="/img/allergens/sesame.jpg" alt="sesame" /><span>sesame</span>
    </div>
    <div>
      <img src="/img/allergens/sulphites.jpg" alt="sulphites" /><span>sulphites</span>
    </div>
    <div>
      <img src="/img/allergens/lupin.jpg" alt="lupin" /><span>lupin</span>
    </div>
    <div>
      <img src="/img/allergens/molluscs.jpg" alt="molluscs" /><span>molluscs</span>
    </div> -->
  </div>

  <div class="flex justify-between w-full px-10" style="position: absolute; bottom: 2rem">
  <div style="width: 8rem">
      <img src="/img/nadal-ce.png" alt="" />
  </div>
  <div style="width: 8rem">
      <img src="/img/nadal-cd.png" alt="" />
  </div>
  </div>



</div>

</div>

<style>
  @import url(../../../css/reset.css);
  @import url(../../../../static/fonts/fonts.css);

  .language {
    position: absolute;
    right: 5px;
    top: 5px;
  }

  .logo {
    margin-top: 10px;
  }

  .logo img {
    width: 400px;
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

  .info-section {
    font-size: small;
  }

  .dish {
    margin: 10px 0 0 0;
  }

  .featured {
    font-size: x-large;
  }

  @media (max-width: 768px) {
    .section {
      width: 100%;
    }

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
      margin-left: 20px;
    }

    .allergen-list {
      display: flex;
      max-width: 80%;
      flex-wrap: wrap;
      justify-content: center;
    }
  }

  .dish .name {
    font-size: x-large;
    text-align: left;
  }

  .info-section > .dish .name {
    font-size: medium;
    font-style: italic;
  }

  .dish .vegetarian {
    color: green;
    font-weight: bold;
    font-style: italic;
    margin-left: 10px;
  }

  .dish .description {
    font-style: italic;
  }

  .allergens {
    display: flex;
    margin-left: 0.5rem;
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

  /* printing */

  @page {
    size: A5 landscape;
  }

  @media print {
    .language {
      display: none;
    }

    .footer {
      font-size: smaller;
    }
  }
</style>
