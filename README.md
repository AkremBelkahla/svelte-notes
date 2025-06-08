# 📝 Svelte Notes

Une application de prise de notes simple et élégante construite avec Svelte et Tailwind CSS.

![Capture d'écran de l'application](public/screenshot.png)

## ✨ Fonctionnalités

- 📝 Créer, modifier et supprimer des notes
- 🔍 Recherche en temps réel
- 🌓 Mode clair/sombre
- 📱 Design responsive
- 💾 Stockage local avec localStorage
- ⚡ Rapide et légère

## 🚀 Démarrage rapide 

1. **Cloner le dépôt** 
   ```bash
   git clone https://github.com/votre-utilisateur/svelte-notes.git
   cd svelte-notes
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

4. **Ouvrir dans le navigateur**
   L'application sera disponible à l'adresse [http://localhost:5173](http://localhost:5173)

## 🛠️ Technologies utilisées

- [Svelte](https://svelte.dev/) - Framework JavaScript
- [Vite](https://vitejs.dev/) - Outil de build
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitaire
- [PostCSS](https://postcss.org/) - Outil de transformation de styles
- [Autoprefixer](https://github.com/postcss/autoprefixer) - Ajout automatique des préfixes vendeurs

## 📦 Scripts NPM

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Compile pour la production
- `npm run preview` - Aperçu de la version de production
- `npm run check` - Vérification avec Svelte Check

## 🎨 Personnalisation

### Couleurs

Les couleurs peuvent être personnalisées en modifiant le fichier `tailwind.config.js`.

### Police

L'application utilise la police [Inter](https://rsms.me/inter/) par défaut. Vous pouvez la changer en modifiant la configuration de la police dans `tailwind.config.js`.

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus d'informations.

## 🙏 Remerciements

- [Svelte](https://svelte.dev/) pour ce framework incroyable
- [Tailwind CSS](https://tailwindcss.com/) pour les styles
- [Vite](https://vitejs.dev/) pour l'expérience de développement

Should you later need the extended capabilities and extensibility provided by SvelteKit, the template has been structured similarly to SvelteKit so that it is easy to migrate.

**Why `global.d.ts` instead of `compilerOptions.types` inside `jsconfig.json` or `tsconfig.json`?**

Setting `compilerOptions.types` shuts out all other types not explicitly listed in the configuration. Using triple-slash references keeps the default TypeScript setting of accepting type information from the entire workspace, while also adding `svelte` and `vite/client` type information.

**Why include `.vscode/extensions.json`?**

Other templates indirectly recommend extensions via the README, but this file allows VS Code to prompt the user to install the recommended extension upon opening the project.

**Why enable `checkJs` in the JS template?**

It is likely that most cases of changing variable types in runtime are likely to be accidental, rather than deliberate. This provides advanced typechecking out of the box. Should you like to take advantage of the dynamically-typed nature of JavaScript, it is trivial to change the configuration.

**Why is HMR not preserving my local component state?**

HMR state preservation comes with a number of gotchas! It has been disabled by default in both `svelte-hmr` and `@sveltejs/vite-plugin-svelte` due to its often surprising behavior. You can read the details [here](https://github.com/sveltejs/svelte-hmr/tree/master/packages/svelte-hmr#preservation-of-local-state).

If you have state that's important to retain within a component, consider creating an external store which would not be replaced by HMR.

```js
// store.js
// An extremely simple external store
import { writable } from 'svelte/store'
export default writable(0)
```
