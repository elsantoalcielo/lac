<script lang="ts">
  import { PLACEHOLDER_PRICE } from "$lib/utils";

  let { value = $bindable(), label = "Preu" }: { value: string; label?: string } = $props();

  // "1.8", "1,8" and "1,80 €" all end up as "1,80 €"
  const normalize = () => {
    const amount = parseFloat(value.replace(/[^\d.,]/g, "").replace(",", "."));
    if (!isNaN(amount)) {
      value = amount.toFixed(2).replace(".", ",") + " €";
    }
  };

  const pending = $derived(value.trim() === "" || value === PLACEHOLDER_PRICE);
</script>

<label class="block">
  <span class="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sepia-600">
    {label}
    {#if pending}
      <span class="rounded-full bg-amber-200 px-2 py-0.5 text-[10px] normal-case tracking-normal text-amber-900">{value.trim() === "" ? "Falta" : "Pendent"}</span>
    {/if}
  </span>
  <input
    class="w-full rounded-md border bg-white px-3 py-2 text-base tabular-nums text-sepia-900 focus:outline-none focus:ring-2 focus:ring-sepia-400 {pending ? 'border-amber-400' : 'border-sepia-400/50'}"
    inputmode="decimal"
    bind:value
    onblur={normalize}
  />
</label>
