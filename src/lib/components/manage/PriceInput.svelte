<script lang="ts">
  let {
    value = $bindable(),
    label = "Preu",
    currency = true,
    pendingValue,
  }: { value: string; label?: string; currency?: boolean; pendingValue?: string } = $props();

  // "1.8", "1,8" and "1,80 €" all end up as "1,80 €" (or "1,80" when the price is stored without the symbol)
  const normalize = () => {
    const amount = parseFloat(value.replace(/[^\d.,]/g, "").replace(",", "."));
    if (!isNaN(amount)) {
      value = amount.toFixed(2).replace(".", ",") + (currency ? " €" : "");
    }
  };

  const missing = $derived(value.trim() === "");
  const pending = $derived(missing || (pendingValue !== undefined && value === pendingValue));
</script>

<label class="block">
  <span class="mb-1 flex items-center gap-2 text-sm font-medium text-slate-700">
    {label}
    {#if pending}
      <span class="rounded-full bg-amber-200 px-2 py-0.5 text-[10px] normal-case tracking-normal text-amber-900">{missing ? "Falta" : "Pendent"}</span>
    {/if}
  </span>
  <div class="relative">
    <input
      class="w-full rounded-md border bg-white px-3 py-2 text-base lining-nums tabular-nums text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 {currency ? '' : 'pr-8'} {pending ? 'border-amber-400' : 'border-slate-300'}"
      inputmode="decimal"
      bind:value
      onblur={normalize}
    />
    {#if !currency}
      <span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">€</span>
    {/if}
  </div>
</label>
