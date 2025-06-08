<script>
  import { notes } from '../stores/notes';
  
  export let note;
  export let isEditing = false;
  
  // Formater la date pour l'affichage
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };
  
  // Supprimer la note
  function handleDelete() {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette note ?')) {
      $notes.deleteNote(note.id);
    }
  }
</script>

<article class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4 border-l-4 border-blue-500 hover:shadow-lg transition-shadow duration-200">
  <div class="flex justify-between items-start">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
      {note.title}
    </h3>
    <div class="flex space-x-2">
      <button
        on:click|stopPropagation
        on:keydown|stopPropagation
        on:keyup|stopPropagation
        on:keypress|stopPropagation
        on:mousedown|stopPropagation
        on:mouseup|stopPropagation
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
  
  <div class="prose dark:prose-invert max-w-none mb-3">
    <p class="whitespace-pre-line text-gray-700 dark:text-gray-300">
      {note.content || <span class="text-gray-400 italic">Aucun contenu</span>}
    </p>
  </div>
  
  <div class="text-xs text-gray-500 dark:text-gray-400">
    <span>Créé le {formatDate(note.createdAt)}</span>
    {note.updatedAt !== note.createdAt && (
      <span> • Modifié le {formatDate(note.updatedAt)}</span>
    )}
  </div>
  
  {#if isEditing}
    <div class="mt-4">
      <NoteForm editingNote={note} on:close={() => isEditing = false} />
    </div>
  {/if}
</article>
