<script>
  import { notes } from '../stores/notes';
  
  export let editingNote = null;
  
  let title = '';
  let content = '';
  
  // Si on est en mode édition, on pré-remplit le formulaire
  $: if (editingNote) {
    title = editingNote.title;
    content = editingNote.content;
  }
  
  // Gestion de la soumission du formulaire
  function handleSubmit() {
    if (!title.trim()) return;
    
    const noteData = { title: title.trim(), content: content.trim() };
    
    if (editingNote) {
      // Mise à jour d'une note existante
      $notes.updateNote(editingNote.id, noteData);
    } else {
      // Création d'une nouvelle note
      $notes.addNote(noteData);
    }
    
    // Réinitialisation du formulaire
    title = '';
    content = '';
    editingNote = null;
  }
  
  // Annuler l'édition
  function cancelEdit() {
    title = '';
    content = '';
    editingNote = null;
  }
</script>

<div class="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
  <h2 class="text-xl font-semibold mb-4">
    {editingNote ? 'Modifier la note' : 'Nouvelle note'}
  </h2>
  
  <form on:submit|preventDefault={handleSubmit} class="space-y-4">
    <div>
      <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Titre <span class="text-red-500">*</span>
      </label>
      <input
        type="text"
        id="title"
        bind:value={title}
        placeholder="Titre de la note"
        required
        class="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
    
    <div>
      <label for="content" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Contenu
      </label>
      <textarea
        id="content"
        bind:value={content}
        placeholder="Contenu de la note..."
        rows="3"
        class="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      ></textarea>
    </div>
    
    <div class="flex justify-end space-x-2">
      {#if editingNote}
        <button
          type="button"
          on:click={cancelEdit}
          class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Annuler
        </button>
      {/if}
      
      <button
        type="submit"
        class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!title.trim()}
      >
        {editingNote ? 'Mettre à jour' : 'Ajouter'}
      </button>
    </div>
  </form>
</div>
