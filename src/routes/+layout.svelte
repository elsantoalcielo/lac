<script>
  // Your selected Skeleton theme:
  import "@skeletonlabs/skeleton/themes/theme-skeleton.css";

  // This contains the bulk of Skeletons required styles:
  // NOTE: this will be renamed skeleton.css in the v2.x release.
  import "@skeletonlabs/skeleton/styles/skeleton.css";

  import "../app.postcss";

  import Analytics from "$lib/components/analytics.svelte";

  import "../css/global.css";
</script>

<Analytics />

<slot />
