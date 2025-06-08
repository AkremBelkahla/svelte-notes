<script>
  import { onMount } from 'svelte';
  import { notes, loadNotes } from './stores/notes';
  import { theme, toggleTheme } from './stores/theme';
  import NoteForm from './components/NoteForm.svelte';
  import NoteList from './components/NoteList.svelte';
  
  let searchQuery = '';
  
  // Filtrer les notes en fonction de la recherche
  $: filteredNotes = $notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (note.content && note.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  // Charger les notes au démarrage
  onMount(() => {
    loadNotes();
  });
</script>

<div class="min-h-screen transition-colors duration-300 {$theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}">
  <div class="container mx-auto px-4 py-8 max-w-4xl">
    <header class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Svelte Notes
      </h1>
      <div class="flex items-center space-x-4">
        <button 
          on:click={toggleTheme}
          class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Changer de thème"
        >
          {#if $theme === 'dark'}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          {:else}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          {/if}
        </button>
      </div>
    </header>

    <div class="mb-6">
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Rechercher des notes..."
          bind:value={searchQuery}
          class="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          aria-label="Rechercher des notes"
        />
      </div>
    </div>

    <NoteForm />
    <NoteList {filteredNotes} />
    
    {#if $notes.length > 0}
      <div class="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        {filteredNotes.length} {filteredNotes.length === 1 ? 'note' : 'notes'} {searchQuery ? 'trouvée(s)' : 'au total'}
      </div>
    {/if}
  </div>
</div>

<style>
  /* Styles globaux */
  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  /* Styles pour les éléments de formulaire */
  :global(input), :global(textarea), :global(select) {
    @apply focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors;
  }
  
  /* Styles pour les boutons */
  :global(button) {
    @apply focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors;
  }
  
  /* Styles pour le mode sombre */
  :global(.dark) {
    color-scheme: dark;
  }
  
  /* Styles pour les liens */
  :global(a) {
    @apply text-blue-600 dark:text-blue-400 hover:underline;
  }
  
  /* Styles pour les éléments de formulaire en mode sombre */
  :global(.dark input), 
  :global(.dark textarea), 
  :global(.dark select) {
    @apply bg-gray-700 border-gray-600 text-white placeholder-gray-400;
  }
  
  :global(.dark input:focus), 
  :global(.dark textarea:focus), 
  :global(.dark select:focus) {
    @apply ring-blue-500;
  }
</style>
