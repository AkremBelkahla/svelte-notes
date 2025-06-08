import { writable } from 'svelte/store';

// Création d'un store personnalisé pour les notes
function createNotesStore() {
  const { subscribe, set, update } = writable([]);
  
  // Charger les notes depuis le localStorage
  const loadNotes = () => {
    if (typeof window !== 'undefined') {
      const savedNotes = localStorage.getItem('svelte-notes');
      if (savedNotes) {
        set(JSON.parse(savedNotes));
      }
    }
  };
  
  // Sauvegarder les notes dans le localStorage
  const saveNotes = (notes) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('svelte-notes', JSON.stringify(notes));
    }
  };
  
  // Ajouter une nouvelle note
  const addNote = (note) => {
    update(notes => {
      const newNote = {
        ...note,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      const updatedNotes = [newNote, ...notes];
      saveNotes(updatedNotes);
      return updatedNotes;
    });
  };
  
  // Mettre à jour une note existante
  const updateNote = (id, updatedNote) => {
    update(notes => {
      const updatedNotes = notes.map(note => 
        note.id === id 
          ? { ...note, ...updatedNote, updatedAt: new Date().toISOString() }
          : note
      );
      saveNotes(updatedNotes);
      return updatedNotes;
    });
  };
  
  // Supprimer une note
  const deleteNote = (id) => {
    update(notes => {
      const updatedNotes = notes.filter(note => note.id !== id);
      saveNotes(updatedNotes);
      return updatedNotes;
    });
  };
  
  return {
    subscribe,
    addNote,
    updateNote,
    deleteNote,
    loadNotes
  };
}

export const notes = createNotesStore();
