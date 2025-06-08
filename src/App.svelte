<script>
  import { onMount } from 'svelte';
  import { notes } from './stores/notes';
  import { theme, toggleTheme } from './stores/theme';
  import NoteForm from './components/NoteForm.svelte';
  import NoteList from './components/NoteList.svelte';
  import Toast from './components/Toast.svelte';
  
  let searchQuery = '';
  let showNoteForm = false;
  let toastMessage = '';
  let showToast = false;
  
  // Filtrer les notes en fonction de la recherche
  $: filteredNotes = $notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (note.content && note.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  // Afficher un message toast
  function displayToast(message) {
    toastMessage = message;
    showToast = true;
    setTimeout(() => showToast = false, 3000);
  }
  
  // Gérer l'ajout d'une note
  function handleNoteAdded() {
    showNoteForm = false;
    displayToast('Note créée');
  }
  
  // Charger les notes au démarrage
  onMount(() => {
    notes.loadNotes();
  });
</script>

<div class="min-h-screen transition-colors duration-300 {$theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}">
  <div class="container mx-auto px-4 py-6 max-w-3xl">
    <header class="flex justify-between items-center mb-6">
      <div class="flex items-center">
        <div class="mr-3 bg-orange-500 text-white p-2 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
        <div>
          <h1 class="text-xl font-bold">Svelte Notes</h1>
          <p class="text-sm text-gray-500 dark:text-gray-400">{$notes.length} note{$notes.length !== 1 ? 's' : ''} disponible{$notes.length !== 1 ? 's' : ''}</p>
        </div>
      </div>
      <div class="flex items-center space-x-2">
        <button 
          class="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Notifications"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
        <button 
          on:click={toggleTheme}
          class="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Mode sombre"
        >
          {#if $theme === 'dark'}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          {:else}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          placeholder="Rechercher parmi {$notes.length} note{$notes.length !== 1 ? 's' : ''}..."
          bind:value={searchQuery}
          class="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
          aria-label="Rechercher des notes"
        />
      </div>
    </div>

    <button 
      on:click={() => showNoteForm = true}
      class="flex items-center w-full mb-6 py-3 px-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
    >
      <span class="text-orange-500 mr-2">+</span>
      <span>Nouvelle note</span>
    </button>

    {#if showNoteForm}
      <NoteForm on:noteAdded={handleNoteAdded} />
    {/if}
    
    <NoteList {filteredNotes} />
    
    {#if showToast}
      <Toast message={toastMessage} />
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
    outline: none;
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }
  
  :global(input:focus), :global(textarea:focus), :global(select:focus) {
    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
    --tw-ring-opacity: 1;
    --tw-ring-color: rgb(59 130 246 / var(--tw-ring-opacity));
    border-color: transparent;
  }
  
  /* Styles pour les boutons */
  :global(button) {
    outline: none;
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }
  
  :global(button:focus) {
    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
    --tw-ring-opacity: 1;
    --tw-ring-color: rgb(59 130 246 / var(--tw-ring-opacity));
  }
  
  /* Styles pour le mode sombre */
  :global(.dark) {
    color-scheme: dark;
  }
  
  /* Styles pour les liens */
  :global(a) {
    color: rgb(37 99 235);
    text-decoration: none;
  }
  
  :global(a:hover) {
    text-decoration: underline;
  }
  
  :global(.dark a) {
    color: rgb(96 165 250);
  }
  
  /* Styles pour les éléments de formulaire en mode sombre */
  :global(.dark input), 
  :global(.dark textarea), 
  :global(.dark select) {
    background-color: rgb(55 65 81);
    border-color: rgb(75 85 99);
    color: white;
  }
  
  :global(.dark input::placeholder),
  :global(.dark textarea::placeholder) {
    color: rgb(156 163 175);
  }
  
  :global(.dark input:focus), 
  :global(.dark textarea:focus), 
  :global(.dark select:focus) {
    --tw-ring-color: rgb(59 130 246);
  }
</style>
