<svelte:head>
  <title>L'Amagat Cafè</title>
  <meta name="description" content="Lloc petit i bufó al cor del Guinardó. Proposta senzilla però feta amb amor. Cafè, entrepans, plats, i bona atenció" />
</svelte:head>
<div class="page">
  <div class="header">
    <div class="logo">
      <img src="/img/logo.png" alt="logo" />
    </div>
  </div>
  <div class="background">
    <div class="wave" />
  </div>
  <a href="https://www.instagram.com/lamagatcafe/">
    <div class="instagram" />
  </a>
  <a href="carta">
    <div class="carta" />
  </a>
</div>

<style>
  @import url(../css/reset.css);

  @media (max-width: 992px) and (orientation: portrait) {
    .page {
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .header {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: white;
      padding: 20px 0 10px 0;
    }

    .logo {
      width: 300px;
    }

    .logo img {
      width: 100%;
    }

    .wave {
      background-image: url(/img/wave_p.svg);
      background-repeat: no-repeat;
      background-size: 100%;
      height: 50px;
      filter: drop-shadow(10px 10px 5px black);
    }

    .background {
      background-image: url(/img/bbw.jpg);
      background-repeat: no-repeat;
      background-position: right -225px top 0;
      background-color: black;
      background-size: 1400px;
      width: 100%;
      flex: 1;
    }
  }

  @media (min-width: 992px), (orientation: landscape) {
    .page {
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .header {
      display: flex;
      flex-direction: row;
      align-items: center;
      background-color: white;
      padding: 0px 10px 0 20px;
    }

    .logo {
      width: 250px;
    }

    .logo img {
      width: 100%;
    }

    .wave {
      background-image: url(/img/wave_l.svg);
      background-repeat: no-repeat;
      background-size: auto 100%;
      height: 100vh;
      width: 25px;
      filter: drop-shadow(10px 10px 5px black);
    }

    .background {
      background-image: url(/img/bbw.jpg);
      background-repeat: no-repeat;
      background-position: right -225px top 0;
      background-size: 1400px;
      background-color: black;
      width: 100%;
      flex: 1;
    }
  }

  @media (min-width: 1200px) {
    .background {
      background-position: top 0 left 0;
      background-size: cover;
    }
  }

  .instagram {
    width: 76px;
    height: 76px;
    position: absolute;
    bottom: 20px;
    right: 20px;
    background-image: url(/img/instagram.svg);
    background-repeat: no-repeat;
    background-size: 50px 50px;
    background-position: 13px 13px;
    background-color: white;
    border-radius: 20px 20px;
    filter: drop-shadow(0px 10px 5px black);
  }

  .carta {
    width: 180px;
    height: 76px;
    position: absolute;
    bottom: 20px;
    right: 120px;
    background-image: url(/img/carta.svg);
    background-repeat: no-repeat;
    background-size: 125px 125px;
    background-position: 27px -25px;
    background-color: white;
    border-radius: 20px 20px;
    filter: drop-shadow(0px 10px 5px black);
  }

  .instagram:hover,
  .carta:hover {
    filter: invert(1);
  }
</style>
