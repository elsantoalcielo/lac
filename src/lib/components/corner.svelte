<script lang="ts">
  export let filled = false;
  let className = "";
  export { className as class };
</script>

<div aria-hidden="true" class="absolute w-12 h-12 text-sepia-800 pointer-events-none {className}">
  <svg fill="currentColor" viewBox="0 0 100 100">
    {#if filled}
      <path d="M4,4 L40,4 C38,10 32,15 28,15 C20,15 15,20 15,28 C15,32 10,38 4,40 Z" opacity="0.2" />
    {/if}
    <path d="M2,2 L48,2 C44,9 38,13 32,13 C23,13 13,23 13,32 C13,38 9,44 2,48 Z" fill="none" stroke="currentColor" stroke-width="2.5" />
    <circle cx="16" cy="16" r="3" />
    <path d="M12,42 C16,30 30,16 42,12 C35,18 18,35 12,42 Z" />
    <path d="M2,20 C8,20 20,8 20,2" fill="none" stroke="currentColor" stroke-width="1.5" />
  </svg>
</div>
