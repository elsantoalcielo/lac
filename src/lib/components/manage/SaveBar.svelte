<script lang="ts">
  type Status = { kind: "idle" | "saved" | "error" | "conflict"; text: string };

  let { dirty, saving, invalid, status, onsave, onhistory }: { dirty: boolean; saving: boolean; invalid: boolean; status: Status; onsave: () => void; onhistory: () => void } = $props();

  const message = $derived(
    status.kind != "idle" && !dirty ? status.text : status.kind == "error" || status.kind == "conflict" ? status.text : dirty ? "Canvis sense desar" : ""
  );
</script>

<div class="fixed inset-x-0 bottom-0 z-20 border-t border-sepia-400/50 bg-[#f7eedb]/95 backdrop-blur" style="padding-bottom: env(safe-area-inset-bottom)">
  <div class="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3">
    <div
      class="min-w-0 flex-1 truncate text-sm {status.kind == 'error' || status.kind == 'conflict' ? 'font-semibold text-red-700' : dirty ? 'text-amber-800' : 'text-green-800'}"
      role="status"
    >
      {message}
    </div>
    <button type="button" class="rounded-md border border-sepia-400 px-4 py-2 text-sepia-800 hover:bg-sepia-200/40" onclick={onhistory}>Historial</button>
    <button
      type="button"
      class="rounded-md bg-sepia-800 px-5 py-2 font-semibold text-amber-50 hover:bg-sepia-700 disabled:cursor-not-allowed disabled:opacity-40"
      disabled={!dirty || saving || invalid}
      onclick={onsave}
    >
      {saving ? "Desant…" : "Desa"}
    </button>
  </div>
</div>
