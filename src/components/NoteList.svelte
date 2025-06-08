<script>
  import { notes } from '../stores/notes';
  import NoteItem from './NoteItem.svelte';
  
  export let filteredNotes = [];
  
  // Charger les notes au montage du composant
  import { onMount } from 'svelte';
  onMount(() => {
    $notes.loadNotes();
  });
</script>

<div class="space-y-4">
  {#if $notes.length === 0}
    <div class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <h3 class="mt-2 text-lg font-medium text-gray-900 dark:text-white">Aucune note</h3>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Commencez par créer votre première note en utilisant le formulaire ci-dessus.
      </p>
    </div>
  {:else if filteredNotes.length === 0}
    <div class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 class="mt-2 text-lg font-medium text-gray-900 dark:text-white">Aucun résultat</h3>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Aucune note ne correspond à votre recherche.
      </p>
    </div>
  {:else}
    {#each filteredNotes as note (note.id)}
      <NoteItem {note} />
    {/each}
  {/if}
</div>
