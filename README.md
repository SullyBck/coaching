# Ségolène Falandry — site de coaching exécutif

Site bilingue (FR/EN) construit avec Next.js (App Router), next-intl et Tailwind CSS.

## Démarrer

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) — redirige vers `/fr`.

## Structure

- `src/app/[locale]/` — les 5 pages (Accueil, À propos, Services, Ressources, Contact), préfixées `/fr` ou `/en`.
- `messages/{fr,en}.json` — textes d'interface fixes (nav, footer, formulaire).
- `src/content/` — contenu éditorial typé (FR/EN), structuré pour être branché sur Sanity dans une passe ultérieure sans changer les pages.
- `src/i18n/` — configuration next-intl (routing, navigation, requête).

Voir `CLAUDE.md` à la racine pour les conventions du projet.
