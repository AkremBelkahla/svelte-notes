<script>
  import { createEventDispatcher } from 'svelte';
  import { notes } from '../stores/notes';
  
  export let editingNote = null;
  
  let title = '';
  let content = '';
  let reminderDate = '';
  const dispatch = createEventDispatcher();
  
  // Si on est en mode édition, on pré-remplit le formulaire
  $: if (editingNote) {
    title = editingNote.title;
    content = editingNote.content;
    reminderDate = editingNote.reminderDate || '';
  }
  
  // Gestion de la soumission du formulaire
  function handleSubmit() {
    if (!title.trim()) return;
    
    const noteData = { 
      title: title.trim(), 
      content: content.trim(),
      reminderDate: reminderDate || null
    };
    
    if (editingNote) {
      // Mise à jour d'une note existante
      notes.updateNote(editingNote.id, noteData);
    } else {
      // Création d'une nouvelle note
      notes.addNote(noteData);
    }
    
    // Réinitialisation du formulaire
    title = '';
    content = '';
    reminderDate = '';
    editingNote = null;
    
    // Informer le composant parent que la note a été ajoutée
    dispatch('noteAdded');
  }
  
  // Annuler l'édition
  function cancelEdit() {
    title = '';
    content = '';
    reminderDate = '';
    editingNote = null;
    dispatch('cancel');
  }
</script>

<div class="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
  <form on:submit|preventDefault={handleSubmit} class="space-y-4">
    <input
      type="text"
      bind:value={title}
      placeholder="Titre de la note..."
      required
      class="w-full p-2 border-0 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-0 focus:border-orange-500 text-lg font-medium"
    />
    
    <textarea
      bind:value={content}
      placeholder="Écrivez votre note ici..."
      rows="4"
      class="w-full p-2 border-0 bg-white dark:bg-gray-800 focus:ring-0 resize-none"
    ></textarea>
    
    <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>Rappel (par défaut dans 1 heure)</span>
    </div>
    
    <input
      type="datetime-local"
      bind:value={reminderDate}
      class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
    />
    
    <div class="flex justify-center pt-2">
      <button
        type="button"
        on:click={cancelEdit}
        class="px-4 py-2 mr-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
      >
        Annuler
      </button>
      
      <button
        type="submit"
        class="px-8 py-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        disabled={!title.trim()}
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Créer
      </button>
    </div>
  </form>
</div>
