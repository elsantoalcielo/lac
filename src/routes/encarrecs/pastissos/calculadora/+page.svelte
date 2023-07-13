<script lang="ts">
  import { Step, Stepper } from "@skeletonlabs/skeleton";

  let smallChecked: boolean;
  let mediumChecked: boolean;
  let largeChecked: boolean;

  let tastes = [
    { name: "xocolate", translation: "Xocolata", checked: false },
    { name: "lemon", translation: "Llimona", checked: false },
    { name: "pearl_vanilla", translation: "Pera i vainilla", checked: false },
    { name: "pearl_cocoa", translation: "Pera i cacau", checked: false },
    { name: "zucchini_lemon", translation: "Carbassó i llimona", checked: false },
    { name: "carrot", translation: "Pastanaga", checked: false },
    { name: "orange_cocoa", translation: "Taronja i cacau", checked: false },
    { name: "apple_lavender", translation: "Poma i espígol", checked: false },
    { name: "banana_cocoa", translation: "Plàtan i cacau", checked: false },
    { name: "mandaarin", translation: "Mandarina", checked: false },
    { name: "hazelnut", translation: "Avellanes", checked: false },
    { name: "coconut_lemon", translation: "Coco i llimona", checked: false },
  ];
  let someTasteChecked: boolean;

  let simpleChecked: boolean;
  let decoratedChecked: boolean;

  let completed = false;

  const changeSize = (size: string, origin?: string) => {
    if (origin == "div") {
      switch (size) {
        case "S":
          smallChecked = !smallChecked;
          break;
        case "M":
          mediumChecked = !mediumChecked;
          break;
        case "L":
          largeChecked = !largeChecked;
          break;
      }
    }
    if (size == "S" && smallChecked) {
      mediumChecked = false;
      largeChecked = false;
    }
    if (size == "M" && mediumChecked) {
      smallChecked = false;
      largeChecked = false;
    }
    if (size == "L" && largeChecked) {
      smallChecked = false;
      mediumChecked = false;
    }
  };

  const changeTaste = (index: number, origin?: string) => {
    if (origin == "div") {
      tastes[index].checked = !tastes[index].checked;
    }
    if (tastes[index].checked) {
      for (let i = 0; i < tastes.length; i++) {
        if (i != index) {
          tastes[i].checked = false;
        }
      }
    }
    someTasteChecked = tastes[index].checked;
  };

  const changeFinish = (finish: string, origin?: string) => {
    if (origin == "div") {
      switch (finish) {
        case "S":
          simpleChecked = !simpleChecked;
          break;
        case "D":
          decoratedChecked = !decoratedChecked;
          break;
      }
    }
    if (finish == "S" && simpleChecked) {
      decoratedChecked = false;
    }
    if (finish == "D" && decoratedChecked) {
      simpleChecked = false;
    }
  };
</script>

<svelte:head>
  <title>L'Amagat Cafè - Estimació de preu de pastissos</title>
</svelte:head>

<div class="p-3 h-full flex flex-col items-center">
  <div class="w-20">
    <a href="/">
      <img src="/img/logo.png" alt="logo" />
    </a>
  </div>

  {#if completed == false}
    <Stepper
      stepTerm="Pas"
      buttonBack="absolute left-3 bottom-3 variant-ghost"
      buttonBackLabel="← Anterior"
      buttonNext="absolute right-3 bottom-3 variant-ghost"
      buttonNextLabel="Següent →"
      buttonComplete="absolute right-3 bottom-3 variant-filled-primary"
      buttonCompleteLabel="Llestos!"
      class="min-w-full md:min-w-[576px] md:max-w-xl"
      on:complete={() => (completed = true)}
    >
      <Step class="font-[Nunito]" regionHeader="font-[Satisfy]" locked={!(smallChecked || mediumChecked || largeChecked)}>
        <svelte:fragment slot="header">Per començar, tria la mida</svelte:fragment>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="mx-2 font-[Nunito] flex items-center" on:click={() => changeSize("S", "div")}>
          <input type="checkbox" class="w-6 h-6" bind:checked={smallChecked} on:change={() => changeSize("S")} />
          <div class="mx-3 w-1/2">
            <div class="font-bold">Petit</div>
            <div>6 racions</div>
          </div>
          <div class="flex flex-1 justify-center">
            <img src="/img/cake_6.svg" alt="petit" class="w-10" />
          </div>
        </div>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="mx-2 font-[Nunito] flex items-center" on:click={() => changeSize("M", "div")}>
          <input type="checkbox" class="w-6 h-6" bind:checked={mediumChecked} on:change={() => changeSize("M")} />
          <div class="mx-3 w-1/2">
            <div class="font-bold">Mitjà</div>
            <div>8-10 racions</div>
          </div>
          <div class="flex flex-1 justify-center">
            <img src="/img/cake_9.svg" alt="mitjà" class="w-12" />
          </div>
        </div>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="mx-2 font-[Nunito] flex items-center" on:click={() => changeSize("L", "div")}>
          <input type="checkbox" class="w-6 h-6" bind:checked={largeChecked} on:change={() => changeSize("L")} />
          <div class="mx-3 w-1/2">
            <div class="font-bold">Gran</div>
            <div>12-14 racions</div>
          </div>
          <div class="flex flex-1 justify-center">
            <img src="/img/cake_12.svg" alt="gran" class="w-14" />
          </div>
        </div>
      </Step>
      <Step class="font-[Nunito]" regionHeader="font-[Satisfy]" locked={!someTasteChecked}>
        <svelte:fragment slot="header">Ara tria el gust</svelte:fragment>
        <div class="mx-2 columns-2">
          {#each tastes as taste, index}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="flex gap-2 items-center h-10" on:click={() => changeTaste(index, "div")}>
              <input type="checkbox" class="w-4 h-4" bind:checked={taste.checked} on:change={() => changeTaste(index)} />
              <div class="font-[Nunito]">{taste.translation}</div>
            </div>
          {/each}
        </div>
      </Step>
      <Step class="font-[Nunito]" regionHeader="font-[Satisfy]" locked={!(simpleChecked || decoratedChecked)}>
        <svelte:fragment slot="header">Finalment, tria l'acabat</svelte:fragment>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="mx-2 font-[Nunito] flex items-center" on:click={() => changeFinish("S", "div")}>
          <input type="checkbox" class="w-6 h-6" bind:checked={simpleChecked} on:change={() => changeFinish("S")} />
          <div class="mx-3 w-1/2">
            <div class="font-bold">Senzill</div>
            <div>Sense res, a pèl!</div>
          </div>
          <div class="flex flex-1 justify-center">
            <img src="/img/cake_simple.svg" alt="gran" class="w-16" />
          </div>
        </div>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="mx-2 font-[Nunito] flex items-center" on:click={() => changeFinish("D", "div")}>
          <input type="checkbox" class="w-6 h-6" bind:checked={decoratedChecked} on:change={() => changeFinish("D")} />
          <div class="mx-3 w-1/2">
            <div class="font-bold">Decorat</div>
            <div>Amb les seves cosetes</div>
          </div>
          <div class="flex flex-1 justify-center">
            <img src="/img/cake_decorated.svg" alt="gran" class="w-16" />
          </div>
        </div>
      </Step>
    </Stepper>
  {/if}

  {#if completed}
    <div class="min-w-full md:min-w-[576px] md:max-w-xl mt-2 mx-2">
      <div class="font-[Satisfy] text-2xl font-bold mx-2">El vostre pastís</div>
      <div class="font-[Nunito] text-lg flex flex-col gap-2 mt-4 mx-2">
        <div>Heu triat un pastís <span class="font-bold">Gran</span> de <span class="font-bold">taronja</span> i <span class="font-bold">decorat</span></div>
        <div>El preu aproximat de la broma serà de <span class="text-2xl font-bold">35 €</span></div>
        <div class="mt-2">
          Truca'ns al <a href="tel:+34937689237"><span class="font-bold">93 768 92 37</span></a> amb un mínim de 48 hores d'antelació i no tres hores abans com fan
          alguns
        </div>
        <div>Si teniu cap al·lergia ja sabeu bla bla bla no volem que ningú no se'ns mori al local, més que res pel tema de la mala imatge</div>
        <div class="mt-4 w-full text-center">
          <button type="button" class="btn variant-ghost" on:click={() => (completed = false)}>Un altre</button>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  @import url(../../../../../static/fonts/fonts.css);
</style>
