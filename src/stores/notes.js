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

/**
 * @typedef {Object} Note
 * @property {string} id - Identifiant unique de la note
 * @property {string} title - Titre de la note
 * @property {string} content - Contenu de la note
 * @property {string} createdAt - Date de création au format ISO
 * @property {string} updatedAt - Date de mise à jour au format ISO
 */

/**
 * @typedef {Object} NotesStore
 * @property {function(function(Note[]): () => void): () => void} subscribe - Fonction pour s'abonner aux changements
 * @property {function({title: string, content: string}): void} addNote - Ajoute une nouvelle note
 * @property {function(string, {title: string, content: string}): void} updateNote - Met à jour une note existante
 * @property {function(string): void} deleteNote - Supprime une note
 * @property {function(): void} loadNotes - Charge les notes depuis le localStorage
 */

/** @type {NotesStore} */
const notesStore = createNotesStore();

// Exportation du store
export const notes = notesStore;
