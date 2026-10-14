<script lang="ts">
  import Corner from "$lib/components/corner.svelte";

  type Item = { name: string; price: string };

  const cafes: Item[] = [
    { name: "Espresso", price: "1,60 €" },
    { name: "Cafè sol", price: "1,80 €" },
    { name: "Americà", price: "2,00 €" },
    { name: "Tallat", price: "1,90 €" },
    { name: "Cafè amb llet", price: "2,20 €" },
    { name: "Capuccino", price: "2,80 €" },
    { name: "Latte", price: "3,00 €" },
    { name: "Flat white", price: "3,20 €" },
    { name: "Mocha", price: "3,40 €" },
    { name: "Caramel macchiato", price: "3,60 €" },
    { name: "Cafè gelat", price: "3,20 €" },
  ];

  const xocolates: Item[] = [
    { name: "Xocolata clàssica", price: "2,80 €" },
    { name: "Xocolata amb nata", price: "3,20 €" },
    { name: "Xocolata blanca", price: "3,20 €" },
    { name: "Xocolata especiada", price: "3,40 €" },
    { name: "Xocolata freda", price: "3,20 €" },
    { name: "Xocolata vienesa", price: "3,60 €" },
  ];

  const tes: Item[] = [
    { name: "Te negre", price: "2,20 €" },
    { name: "Te verd", price: "2,20 €" },
    { name: "Te vermell", price: "2,40 €" },
    { name: "Te blanc", price: "2,80 €" },
    { name: "Infusió de camamilla", price: "2,00 €" },
    { name: "Infusió d'herbes", price: "2,20 €" },
    { name: "Rooibos", price: "2,20 €" },
    { name: "Chai latte", price: "3,20 €" },
  ];

  const tesEspecials: Item[] = [
    { name: "Earl Grey", price: "2,60 €" },
    { name: "Gessamí", price: "2,60 €" },
    { name: "Fruits vermells", price: "2,80 €" },
    { name: "Rooibos vainilla", price: "2,80 €" },
    { name: "Te blau (Oolong)", price: "3,00 €" },
  ];

  const fleurDeLis =
    "M12,2 C11.5,5 9.5,7 8,8 C6.5,7 4.5,7.5 4,9.5 C3.5,12 6,13.5 7.5,13.5 C9,13.5 10,12.5 10.5,11.5 C10.8,13 10.5,15.5 8,16.5 L8,18 L10.5,18 C11,18 11.5,19 12,21 C12.5,19 13,18 13.5,18 L16,18 L16,16.5 C13.5,15.5 13.2,13 13.5,11.5 C14,12.5 15,13.5 16.5,13.5 C18,13.5 20.5,12 20,9.5 C19.5,7.5 17.5,7 16,8 C14.5,7 12.5,5 12,2 Z";
</script>

<svelte:head>
  <title>Cafès · L'Amagat Cafè</title>
</svelte:head>

<div class="bg-stone-300 min-h-screen py-6 px-2 sm:px-4 flex items-center justify-center font-cormorant text-sepia-900 antialiased selection:bg-amber-900 selection:text-amber-100">
  <main class="w-full max-w-[850px] bg-aged-paper menu-shadow rounded-sm relative p-4 sm:p-6 md:p-10 border border-sepia-400/40">
    <!-- Ornate double outer border -->
    <div class="border-[1.5px] border-sepia-700/80 p-1 sm:p-2 relative h-full">
      <div class="border border-sepia-600/60 p-4 sm:p-6 md:p-8 relative">
        <Corner filled class="-top-3.5 -left-3.5" />
        <Corner class="-top-3.5 -right-3.5 rotate-90" />
        <Corner class="-bottom-3.5 -left-3.5 -rotate-90" />
        <Corner class="-bottom-3.5 -right-3.5 rotate-180" />

        <header class="text-center pt-2 pb-6 md:pb-8">
          <h1 class="font-script text-6xl sm:text-7xl md:text-8xl text-sepia-900 tracking-wide select-none leading-none mb-1">
            L'Amagat
          </h1>
          <div class="flex items-center justify-center gap-3 mt-2 sm:mt-3">
            <span class="h-[1px] w-12 sm:w-24 bg-sepia-700/70 inline-block relative">
              <span class="w-1.5 h-1.5 rotate-45 bg-sepia-700 absolute right-0 -top-[2px]" />
            </span>
            <span class="tracking-[0.35em] text-sm sm:text-base md:text-lg font-bold text-sepia-800 uppercase px-1">
              CAFÈ
            </span>
            <span class="h-[1px] w-12 sm:w-24 bg-sepia-700/70 inline-block relative">
              <span class="w-1.5 h-1.5 rotate-45 bg-sepia-700 absolute left-0 -top-[2px]" />
            </span>
          </div>
          <div aria-hidden="true" class="flex justify-center items-center mt-2 text-sepia-700/80">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d={fleurDeLis} />
            </svg>
          </div>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative">
          <div class="hidden md:block absolute left-1/2 top-4 bottom-8 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-sepia-700/40 to-transparent" />

          <!-- Left column: Cafès & Xocolates -->
          <div class="flex flex-col space-y-6 sm:space-y-8">
            <section>
              <div class="flex items-center gap-3 mb-3 pb-1 border-b border-sepia-400/40">
                <svg class="w-7 h-7 text-sepia-800 shrink-0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" viewBox="0 0 64 64">
                  <path d="M14 26 C14 42 22 47 34 47 C46 47 54 42 54 26 L14 26 Z" />
                  <path d="M54 30 C58 30 61 33 61 37 C61 41 57 43 53 43" />
                  <ellipse cx="34" cy="53" rx="26" ry="5" />
                  <path d="M26 19 C25 15 28 13 27 9" stroke-width="1.8" />
                  <path d="M34 20 C33 16 36 14 35 10" stroke-width="1.8" />
                  <path d="M42 19 C41 15 44 13 43 9" stroke-width="1.8" />
                </svg>
                <h2 class="text-xl sm:text-2xl font-bold tracking-[0.2em] text-sepia-900 uppercase">CAFÈS</h2>
              </div>
              <div class="text-base sm:text-[17px] text-sepia-900 leading-relaxed font-normal">
                {#each cafes as item}
                  <div class="menu-item"><span class="name">{item.name}</span><span class="leader" /><span class="price">{item.price}</span></div>
                {/each}
              </div>
            </section>

            <div class="text-center py-2 px-4">
              <p class="font-script text-2xl sm:text-3xl text-sepia-800 leading-snug">
                El bon cafè<br />sempre sap millor<br />en bona companyia
              </p>
              <div class="flex justify-center items-center gap-2 mt-2 text-sepia-700/80">
                <span class="w-8 h-[1px] bg-sepia-600/50" />
                <span class="text-xs">♦</span>
                <span class="w-8 h-[1px] bg-sepia-600/50" />
              </div>
            </div>

            <section>
              <div class="flex items-center gap-3 mb-3 pb-1 border-b border-sepia-400/40">
                <svg class="w-7 h-7 text-sepia-800 shrink-0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" viewBox="0 0 64 64">
                  <path d="M16 28 C16 43 24 48 34 48 C44 48 52 43 52 28 Z" />
                  <path d="M52 32 C56 32 59 34 59 38 C59 42 56 44 52 44" />
                  <ellipse cx="34" cy="53" rx="22" ry="4.5" />
                  <circle cx="34" cy="38" fill="currentColor" r="2" />
                </svg>
                <h2 class="text-xl sm:text-2xl font-bold tracking-[0.2em] text-sepia-900 uppercase">XOCOLATES</h2>
              </div>
              <div class="text-base sm:text-[17px] text-sepia-900 leading-relaxed font-normal">
                {#each xocolates as item}
                  <div class="menu-item"><span class="name">{item.name}</span><span class="leader" /><span class="price">{item.price}</span></div>
                {/each}
              </div>
            </section>

            <div aria-hidden="true" class="pt-2 flex justify-center opacity-85 hover:opacity-100 transition-opacity">
              <svg class="w-48 h-20 text-sepia-800" fill="currentColor" viewBox="0 0 240 100">
                <path d="M50 70 C30 50 40 30 65 25 C75 40 70 60 50 70 Z" fill-opacity="0.2" stroke="currentColor" stroke-width="1.2" />
                <path d="M50 70 C60 50 50 30 65 25" fill="none" stroke="currentColor" stroke-width="1" />
                <path d="M75 30 C95 18 115 25 125 45 C108 52 90 45 75 30 Z" fill-opacity="0.25" stroke="currentColor" stroke-width="1.2" />
                <polygon fill="#ecdcc0" points="105,65 145,50 175,65 135,80" stroke="currentColor" stroke-width="1.6" />
                <polygon points="105,65 135,80 135,90 105,75" stroke="currentColor" stroke-width="1.6" />
                <polygon points="175,65 135,80 135,90 175,75" stroke="currentColor" stroke-width="1.6" />
                <polygon fill="#f4e8d3" points="145,55 175,42 200,53 170,66" stroke="currentColor" stroke-width="1.5" />
                <ellipse cx="190" cy="85" rx="8" ry="5" stroke="currentColor" stroke-width="1.5" transform="rotate(-20 190 85)" />
                <ellipse cx="205" cy="82" rx="7" ry="4.5" stroke="currentColor" stroke-width="1.5" transform="rotate(15 205 82)" />
              </svg>
            </div>
          </div>

          <!-- Right column: Tes, Tes especials & teacup -->
          <div class="flex flex-col space-y-6 sm:space-y-8">
            <section>
              <div class="flex items-center gap-3 mb-3 pb-1 border-b border-sepia-400/40">
                <svg class="w-7 h-7 text-sepia-800 shrink-0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.3" viewBox="0 0 64 64">
                  <path d="M22 24 C22 18 42 18 42 24 L44 38 C44 48 20 48 20 38 Z" />
                  <path d="M32 18 L32 14 C32 12 34 11 36 11" />
                  <path d="M20 30 C12 28 8 36 18 41" />
                  <path d="M44 28 C56 26 58 40 43 43" />
                  <ellipse cx="32" cy="49" rx="14" ry="2.5" />
                </svg>
                <h2 class="text-xl sm:text-2xl font-bold tracking-[0.2em] text-sepia-900 uppercase">TES</h2>
              </div>
              <div class="text-base sm:text-[17px] text-sepia-900 leading-relaxed font-normal">
                {#each tes as item}
                  <div class="menu-item"><span class="name">{item.name}</span><span class="leader" /><span class="price">{item.price}</span></div>
                {/each}
              </div>
            </section>

            <section class="border border-sepia-600/70 p-4 sm:p-5 rounded-sm relative mt-2 bg-sepia-200/10">
              <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-aged-paper px-2 text-sepia-800">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d={fleurDeLis} />
                </svg>
              </div>
              <span class="absolute top-1 left-1 w-2 h-2 border-t border-l border-sepia-700" />
              <span class="absolute top-1 right-1 w-2 h-2 border-t border-r border-sepia-700" />
              <span class="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-sepia-700" />
              <span class="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-sepia-700" />
              <h3 class="text-center font-bold tracking-[0.25em] text-sepia-900 text-sm sm:text-base uppercase mb-3">TES ESPECIALS</h3>
              <div class="text-base sm:text-[17px] text-sepia-900 leading-relaxed font-normal">
                {#each tesEspecials as item}
                  <div class="menu-item"><span class="name">{item.name}</span><span class="leader" /><span class="price">{item.price}</span></div>
                {/each}
              </div>
            </section>

            <div class="text-center pt-2 px-2">
              <p class="font-script text-2xl sm:text-3xl text-sepia-800 leading-snug">
                La vida<br />també es gaudeix<br />en tassa
              </p>
              <div class="flex justify-center items-center mt-2 text-sepia-700/80">
                <span class="text-sm">✤</span>
              </div>
            </div>

            <div aria-hidden="true" class="flex justify-center md:justify-end pr-2 pt-1">
              <svg class="w-44 h-28 text-sepia-900 drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 160 100">
                <ellipse cx="80" cy="80" fill="#faf3e6" rx="58" ry="12" stroke-width="2.2" />
                <ellipse cx="80" cy="80" rx="50" ry="9" stroke-dasharray="3 2" stroke-width="1.2" />
                <ellipse cx="80" cy="80" rx="36" ry="6" stroke-width="1.2" />
                <path d="M42 42 C42 72 58 76 80 76 C102 76 118 72 118 42 L42 42 Z" fill="#faf3e6" stroke-width="2.2" />
                <ellipse cx="80" cy="42" fill="#d9be9f" rx="38" ry="8" stroke-width="2.2" />
                <ellipse cx="80" cy="42" fill="#4d2f1d" rx="34" ry="6.5" />
                <path d="M116 46 C129 46 136 54 133 64 C130 72 121 73 113 69" stroke-linecap="round" stroke-width="2.5" />
                <path d="M65 58 C72 53 78 57 80 64 C82 57 88 53 95 58" fill="none" stroke-width="1.3" />
                <path d="M120 72 C132 68 142 55 145 42" stroke-width="1.4" />
                <path d="M136 60 C143 57 146 50 144 45 C139 48 138 54 136 60 Z" fill="#6d4530" stroke-width="0.8" />
                <path d="M126 66 C131 63 134 58 133 54 C129 56 128 61 126 66 Z" fill="#6d4530" stroke-width="0.8" />
                <ellipse cx="44" cy="87" fill="#543322" rx="5" ry="3.5" stroke-width="1" transform="rotate(-15 44 87)" />
                <ellipse cx="56" cy="89" fill="#543322" rx="4.5" ry="3" stroke-width="1" transform="rotate(25 56 89)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</div>

<style>
  @import url(../../../static/fonts/fonts.css);

  .bg-aged-paper {
    background-color: #f7eedb;
    background-image: radial-gradient(ellipse at 50% 50%, rgba(255, 255, 255, 0.45) 0%, rgba(243, 229, 203, 0.4) 60%, rgba(216, 193, 155, 0.7) 100%),
      radial-gradient(circle at 10% 10%, rgba(200, 172, 134, 0.35) 0%, transparent 40%),
      radial-gradient(circle at 90% 90%, rgba(195, 166, 128, 0.4) 0%, transparent 40%),
      radial-gradient(circle at 90% 10%, rgba(195, 166, 128, 0.35) 0%, transparent 40%),
      radial-gradient(circle at 10% 90%, rgba(195, 166, 128, 0.4) 0%, transparent 40%);
  }

  .menu-shadow {
    box-shadow: 0 15px 40px -10px rgba(71, 46, 27, 0.35), 0 0 0 1px rgba(100, 68, 42, 0.15);
  }

  .menu-item {
    display: flex;
    align-items: baseline;
    position: relative;
    margin-bottom: 0.22rem;
  }

  .menu-item .name {
    background-color: transparent;
    position: relative;
    z-index: 1;
    padding-right: 0.3rem;
    white-space: nowrap;
  }

  .menu-item .leader {
    flex-grow: 1;
    border-bottom: 1.5px dotted #785842;
    position: relative;
    bottom: 0.28em;
    margin: 0 0.2rem;
    opacity: 0.8;
  }

  .menu-item .price {
    background-color: transparent;
    position: relative;
    z-index: 1;
    padding-left: 0.3rem;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }
</style>
