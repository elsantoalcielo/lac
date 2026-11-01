<script lang="ts">
  import { LANGUAGES } from "$lib/languages";

  type Field = { key: string; label: string };
  type Translations = { [language: string]: { [field: string]: string } };

  let { translations = $bindable(), fields }: { translations: Translations | undefined; fields: Field[] } = $props();

  const languages = LANGUAGES.filter((language) => language.locale != "ca");

  const get = (locale: string, key: string) => translations?.[locale]?.[key] ?? "";

  const set = (locale: string, key: string, text: string) => {
    translations ??= {};
    translations[locale] ??= {};
    translations[locale][key] = text;
  };

  const translated = $derived(languages.filter((language) => fields.some((field) => get(language.locale, field.key).trim() != "")).length);
</script>

<details class="group mt-2">
  <summary class="flex cursor-pointer list-none items-center gap-2 text-sm text-sepia-700 hover:text-sepia-900">
    <svg class="h-4 w-4 transition-transform group-open:rotate-90" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M7 4l6 6-6 6V4z" /></svg>
    Traduccions
    <span class="rounded-full px-2 py-0.5 text-xs {translated == languages.length ? 'bg-green-100 text-green-800' : 'bg-sepia-200/60 text-sepia-800'}">{translated}/{languages.length}</span>
  </summary>
  <div class="mt-2 space-y-3">
    {#each languages as language}
      <div class="rounded-md border border-sepia-400/30 bg-white/60 p-2">
        <div class="mb-1 text-xs font-semibold uppercase tracking-wider text-sepia-600">{language.name}</div>
        <div class="grid gap-2 sm:grid-cols-2">
          {#each fields as field}
            <input
              class="w-full rounded-md border border-sepia-400/40 bg-white px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-sepia-400"
              placeholder={field.label}
              aria-label="{field.label} ({language.name})"
              value={get(language.locale, field.key)}
              oninput={(event) => set(language.locale, field.key, event.currentTarget.value)}
            />
          {/each}
        </div>
      </div>
    {/each}
  </div>
</details>
