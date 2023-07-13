<script>
  // Your selected Skeleton theme:
  import "@skeletonlabs/skeleton/themes/theme-skeleton.css";

  // This contains the bulk of Skeletons required styles:
  // NOTE: this will be renamed skeleton.css in the v2.x release.
  import "@skeletonlabs/skeleton/styles/skeleton.css";

  import { computePosition, autoUpdate, offset, shift, flip, arrow } from "@floating-ui/dom";
  import { storePopup } from "@skeletonlabs/skeleton";
  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

  import { fade } from "svelte/transition";

  import "../app.postcss";

  import Analytics from "$lib/components/analytics.svelte";

  export let data;
</script>

<Analytics />

{#key data.pathname}
  <div in:fade={{ duration: 100, delay: 150 }} out:fade={{ duration: 100 }} class="h-full">
    <slot />
  </div>
{/key}
