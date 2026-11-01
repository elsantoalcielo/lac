<script lang="ts" generics="T extends { id: string }">
  import { dndzone } from "svelte-dnd-action";
  import { flip } from "svelte/animate";
  import type { Snippet } from "svelte";

  let { items = $bindable(), children, onchange }: { items: T[]; children: Snippet<[T, number]>; onchange?: () => void } = $props();

  const flipDurationMs = 150;

  // Dragging starts only from the handle, so scrolling on a phone still works.
  // The handle listens in the capture phase: Svelte delegates the plain mousedown and
  // touchstart handlers, which would run after the library has already ignored the press.
  let dragDisabled = $state(true);

  const startDrag = () => {
    dragDisabled = false;
  };
</script>

<div
  class="space-y-3"
  use:dndzone={{ items, flipDurationMs, dragDisabled, dropTargetStyle: {} }}
  onconsider={(event) => (items = event.detail.items)}
  onfinalize={(event) => {
    items = event.detail.items;
    dragDisabled = true;
    onchange?.();
  }}
>
  {#each items as item, index (item.id)}
    <div class="flex items-stretch gap-1 rounded-lg border border-sepia-400/40 bg-[#fbf6ea] shadow-sm" animate:flip={{ duration: flipDurationMs }}>
      <button
        type="button"
        class="flex w-9 shrink-0 cursor-grab items-center justify-center rounded-l-lg text-sepia-600 hover:bg-sepia-200/40 active:cursor-grabbing"
        style="touch-action: none"
        aria-label="Arrossega per canviar l'ordre"
        onmousedowncapture={startDrag}
        ontouchstartcapture={startDrag}
      >
        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <circle cx="7" cy="5" r="1.5" /><circle cx="13" cy="5" r="1.5" />
          <circle cx="7" cy="10" r="1.5" /><circle cx="13" cy="10" r="1.5" />
          <circle cx="7" cy="15" r="1.5" /><circle cx="13" cy="15" r="1.5" />
        </svg>
      </button>
      <div class="min-w-0 flex-1 py-3 pr-3">
        {@render children(item, index)}
      </div>
    </div>
  {/each}
</div>
