import { writable } from 'svelte/store';

// Vérifier la préférence de thème de l'utilisateur
const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'light';
  
  // Vérifier le thème sauvegardé dans localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) return savedTheme;
  
  // Vérifier les préférences système
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  
  return 'light';
};

// Création du store de thème
function createThemeStore() {
  const { subscribe, update } = writable(getInitialTheme());
  
  // Appliquer le thème au chargement
  if (typeof window !== 'undefined') {
    const initialTheme = getInitialTheme();
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }
  
  // Bascule entre les thèmes
  const toggle = () => {
    update(currentTheme => {
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      // Sauvegarder dans localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
      }
      
      return newTheme;
    });
  };
  
  return {
    subscribe,
    toggle
  };
}

export const theme = createThemeStore();
export const toggleTheme = () => theme.toggle();
