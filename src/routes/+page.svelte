<div class="page">
  <div class="header">
    <div class="logo">
      <img src="/img/logo.png" alt="logo" />
    </div>
  </div>
  <div class="background">
    <img class="wave" src="/img/wave_p.svg" alt="wave" />
  </div>
</div>

<style>
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
    width: 100%;
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
</style>
