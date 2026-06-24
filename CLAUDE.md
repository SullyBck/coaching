# Site de coaching — Ségolène Falandry

## Ce qu'on construit
Site vitrine **bilingue (FR + EN)** pour une coach exécutive premium.
5 pages : Accueil, À propos, Services, Ressources, Contact.
Public : dirigeants, cadres seniors et hauts potentiels en transition professionnelle.

## Stack technique
- **Next.js** (App Router) — le site lui-même.
- **Sanity** — le CMS où vit le contenu éditable par la cliente (non-technique).
- **Vercel** — l'hébergement, avec redéploiement automatique à chaque push GitHub.
- Le contenu réel de départ est dans `content-brief.md`. **Lis-le avant de construire.**

## Architecture du contenu (IMPORTANT)
La distinction code / contenu est la règle centrale du projet.
- **Éditable dans Sanity** : les témoignages, les articles et la newsletter, les accroches de chaque page, les descriptions des services. En résumé, tout ce que la cliente voudra modifier elle-même.
- **Figé dans le code** : la structure des pages, le menu, le pied de page, le design, le sélecteur de langue.
- YOU MUST : la cliente ne doit jamais avoir besoin de toucher au code pour modifier un texte.

## Bilingue
- FR et EN dès le départ. Chaque contenu géré dans Sanity a une version FR et une version EN.
- Un sélecteur de langue dans l'en-tête, présent sur toutes les pages.

## Design
- Couleurs : bleu nuit profond `#0D1B2A`, beige sable `#E8DCC9`, or doux `#C3A56E` (accents subtils uniquement), blanc pur `#FFFFFF`.
- Typographie : titres en **Playfair Display**, texte courant en **Inter**.
- Style : minimaliste, premium, beaucoup d'espace et de respiration visuelle, jamais tape-à-l'œil. Photos en clair-obscur, atmosphères calmes.
- Mots directeurs : Clarté, Alignement, Direction.

## Ton de voix
Précis, intelligent, élégant, calme, stratégique. Sensible sans être sentimental. Premium mais sobre.

## Conventions de travail
- Code et messages de commit en anglais.
- Toujours proposer un plan court avant un changement non trivial, avant de l'exécuter.
- Ne jamais committer de clé ou de secret (notamment les identifiants Sanity) dans le dépôt.

## Ce qu'il ne faut PAS faire
- Ne pas écrire en dur dans le code le contenu qui doit être éditable (il va dans Sanity).
- Ne pas utiliser de dessins enfantins, d'illustrations colorées ou d'effets décoratifs : la cliente n'en veut pas, le registre est sobre et haut de gamme.
