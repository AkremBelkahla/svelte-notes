<script>
  import { notes } from '../stores/notes';
  import NoteForm from './NoteForm.svelte';
  
  export let note;
  export let isEditing = false;
  
  // Formater la date pour l'affichage
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };
  
  // Supprimer la note
  function handleDelete() {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette note ?')) {
      notes.deleteNote(note.id);
    }
  }
</script>

<article class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-4 hover:shadow-lg transition-shadow duration-200">
  <div class="flex justify-between items-start">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
      {note.title}
    </h3>
    <div class="flex space-x-2">
      <button
        on:click={() => isEditing = true}
        class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 focus:outline-none"
        aria-label="Modifier la note"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      </button>
      <button
        on:click={handleDelete}
        class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 focus:outline-none"
        aria-label="Supprimer la note"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  </div>
  
  <div class="mb-3">
    {#if note.content}
      <p class="whitespace-pre-line text-gray-700 dark:text-gray-300">
        {note.content}
      </p>
    {:else}
      <p class="whitespace-pre-line text-gray-700 dark:text-gray-300">
        <span class="text-gray-400 italic">Description ici</span>
      </p>
    {/if}
  </div>
  
  <div class="flex justify-between items-center text-xs">
    <div class="text-gray-500 dark:text-gray-400">
      <span>Modifié: {formatDate(note.updatedAt)}</span>
    </div>
    
    {#if note.reminderDate}
      <div class="text-orange-500 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Rappel: {formatDate(note.reminderDate)}</span>
      </div>
    {/if}
  </div>
  
  {#if isEditing}
    <div class="mt-4">
      <NoteForm editingNote={note} on:close={() => isEditing = false} />
    </div>
  {/if}
</article>
