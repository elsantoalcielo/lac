<script lang="ts">
  import { beforeNavigate } from "$app/navigation";

  let { dirty }: { dirty: boolean } = $props();

  beforeNavigate(({ cancel }) => {
    if (dirty && !confirm("Hi ha canvis sense desar. Vols sortir igualment?")) cancel();
  });
</script>

<svelte:window onbeforeunload={(event) => dirty && event.preventDefault()} />
